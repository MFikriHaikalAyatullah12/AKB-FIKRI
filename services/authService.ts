import {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    User,
} from '../types/api';
import { API_CONFIG } from '../utils/config';
import { apiClient } from './apiClient';
import { mockAuthService } from './mockAuthService';

// Flag untuk menentukan apakah menggunakan mock service atau real API
const USE_MOCK_SERVICE = true; // Set ke false jika sudah ada backend

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.login(credentials);
    }

    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        API_CONFIG.ENDPOINTS.LOGIN,
        credentials
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.register(userData);
    }

    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        API_CONFIG.ENDPOINTS.REGISTER,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async logout(): Promise<void> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.logout();
    }

    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error: any) {
      console.warn('Logout request failed:', error.message);
      // Continue with local logout even if server request fails
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.refreshToken(refreshToken);
    }

    try {
      const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
        API_CONFIG.ENDPOINTS.REFRESH_TOKEN,
        { refreshToken }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  }

  async getCurrentUser(): Promise<User> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.getCurrentUser();
    }

    try {
      const response = await apiClient.get<ApiResponse<User>>(
        API_CONFIG.ENDPOINTS.USER_PROFILE
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.updateProfile(userData);
    }

    try {
      const response = await apiClient.put<ApiResponse<User>>(
        API_CONFIG.ENDPOINTS.UPDATE_PROFILE,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.forgotPassword(email);
    }

    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.FORGOT_PASSWORD, { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    if (USE_MOCK_SERVICE) {
      return mockAuthService.resetPassword(token, newPassword);
    }

    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.RESET_PASSWORD, {
        token,
        password: newPassword,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }
}

export const authService = new AuthService();
