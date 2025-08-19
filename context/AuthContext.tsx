import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { authService } from '../services/authService';
import { AuthTokens, LoginRequest, RegisterRequest, User } from '../types/api';
import { STORAGE_KEYS } from '../utils/config';
import { clearCorruptedStorageData, safeJsonParse } from '../utils/storageUtils';

// Auth State Type
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Auth Actions
type AuthAction =
  | { type: 'AUTH_LOADING'; payload: boolean }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_INITIALIZE'; payload: { user: User | null; tokens: AuthTokens | null } }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };

// Initial State
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Auth Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLoading: false,
        error: null,
        isInitialized: true,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        isLoading: false,
        error: action.payload,
        isInitialized: true,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        isLoading: false,
        error: null,
      };

    case 'AUTH_INITIALIZE':
      return {
        ...state,
        isAuthenticated: !!action.payload.user,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLoading: false,
        error: null,
        isInitialized: true,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Auth Context
interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  registerOnly: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from storage
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });

      const [storedAccessToken, storedRefreshToken, storedUser, storedExpiresIn] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
        AsyncStorage.getItem('AUTH_EXPIRES_IN'),
      ]);

      if (storedAccessToken && storedRefreshToken && storedUser) {
        try {
          // Use safe JSON parsing to prevent crashes
          const user = safeJsonParse<User | null>(storedUser, null);
          
          if (!user) {
            // If user data is corrupted, clear all data
            await clearStoredAuthData();
            dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });
            return;
          }

          const tokens = {
            accessToken: storedAccessToken,
            refreshToken: storedRefreshToken,
            expiresIn: storedExpiresIn ? parseInt(storedExpiresIn) : 3600, // Default 1 hour
          };

          // Validate token by fetching current user
          try {
            const currentUser = await authService.getCurrentUser();
            dispatch({
              type: 'AUTH_INITIALIZE',
              payload: { user: currentUser, tokens },
            });
          } catch (error) {
            // Token is invalid, clear stored data
            await clearStoredAuthData();
            dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });
          }
        } catch (parseError) {
          // JSON parse error, clear corrupted data
          console.error('Failed to parse stored user data:', parseError);
          await clearCorruptedStorageData();
          dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });
        }
      } else {
        dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      await clearCorruptedStorageData(); // Clear any corrupted data
      dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });
    }
  };

  const storeAuthData = async (user: User, tokens: AuthTokens) => {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken),
      AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
      AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user)),
      AsyncStorage.setItem('AUTH_EXPIRES_IN', tokens.expiresIn.toString()),
    ]);
  };

  const clearStoredAuthData = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      'AUTH_EXPIRES_IN',
    ]);
  };

  const login = async (credentials: LoginRequest) => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });

      const response = await authService.login(credentials);
      
      await storeAuthData(response.user, response.tokens);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: response.user, tokens: response.tokens },
      });
    } catch (error: any) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      console.log('Starting registration process...', { email: userData.email });
      dispatch({ type: 'AUTH_LOADING', payload: true });

      const response = await authService.register(userData);
      console.log('Registration successful:', { userId: response.user.id });
      
      await storeAuthData(response.user, response.tokens);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: response.user, tokens: response.tokens },
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  const registerOnly = async (userData: RegisterRequest) => {
    try {
      console.log('Starting registration-only process...', { email: userData.email });
      dispatch({ type: 'AUTH_LOADING', payload: true });

      const response = await authService.register(userData);
      console.log('Registration successful (no auto-login):', { userId: response.user.id });
      
      // Don't store auth data or set authenticated state
      // Just finish loading and show success
      dispatch({ type: 'AUTH_LOADING', payload: false });
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('Logout service error:', error);
    } finally {
      await clearStoredAuthData();
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(userData);
      
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error: any) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    registerOnly,
    logout,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
