import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { authService } from '../services/authService';
import { AuthTokens, LoginRequest, RegisterRequest, User } from '../types/api';
import { STORAGE_KEYS } from '../utils/config';
import { safeJsonParse } from '../utils/storageUtils';

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

// STABLE AUTH PROVIDER - Optimized for reliability
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from storage with better error handling
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Initialize immediately to prevent blocking
      dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });

      // Background storage check with timeout
      const storageCheck = async () => {
        try {
          const storagePromise = Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
            AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
            AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
            AsyncStorage.getItem('AUTH_EXPIRES_IN'),
          ]);

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Storage timeout')), 2000)
          );

          const [storedAccessToken, storedRefreshToken, storedUser, storedExpiresIn] = 
            await Promise.race([storagePromise, timeoutPromise]) as string[];

          if (storedAccessToken && storedRefreshToken && storedUser) {
            const user = safeJsonParse<User | null>(storedUser, null);
            
            if (user) {
              const tokens = {
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                expiresIn: storedExpiresIn ? parseInt(storedExpiresIn) : 3600,
              };

              // Quick validation with timeout
              try {
                const userValidation = Promise.race([
                  authService.getCurrentUser(),
                  new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Validation timeout')), 3000)
                  )
                ]);

                const currentUser = await userValidation as User;
                dispatch({
                  type: 'AUTH_INITIALIZE',
                  payload: { user: currentUser, tokens },
                });
              } catch (validationError) {
                // Use stored data if validation fails
                console.warn('Using stored user data (validation failed):', validationError);
                dispatch({
                  type: 'AUTH_INITIALIZE',
                  payload: { user, tokens },
                });
              }
            } else {
              await clearStoredAuthData();
            }
          }
        } catch (error) {
          console.warn('Storage check failed:', error);
          // App continues with guest state
        }
      };

      // Run storage check in background
      storageCheck();
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Ensure app is always initialized
      dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });
    }
  };

  const storeAuthData = async (user: User, tokens: AuthTokens) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken),
        AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
        AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user)),
        AsyncStorage.setItem('AUTH_EXPIRES_IN', tokens.expiresIn.toString()),
      ]);
    } catch (error) {
      console.warn('Failed to store auth data:', error);
    }
  };

  const clearStoredAuthData = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        'AUTH_EXPIRES_IN',
      ]);
    } catch (error) {
      console.warn('Failed to clear auth data:', error);
    }
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
      const errorMessage = error?.response?.data?.message || error?.message || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });

      const response = await authService.register(userData);
      
      await storeAuthData(response.user, response.tokens);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: response.user, tokens: response.tokens },
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const registerOnly = async (userData: RegisterRequest) => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });
      
      // Use register but don't store tokens (register only)
      await authService.register(userData);
      
      dispatch({ type: 'AUTH_LOADING', payload: false });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      await clearStoredAuthData();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.warn('Logout error:', error);
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
      const errorMessage = error?.response?.data?.message || error?.message || 'Update failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    registerOnly,
    logout,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
