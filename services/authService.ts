import {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    User,
} from '../types/api';
import { API_CONFIG } from '../utils/config';
import { apiClient } from './apiClient';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
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
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error: any) {
      console.warn('Logout request failed:', error.message);
      // Continue with local logout even if server request fails
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
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
}

export const authService = new AuthService();
