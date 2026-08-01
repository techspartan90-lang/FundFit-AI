import { apiClient } from '../client';
import { ApiResponse, TokenResponse, UserProfileDTO } from '@/types/api';

export const authService = {
  async register(payload: { email: string; password: str; full_name: string; phone_number?: string }): Promise<ApiResponse<TokenResponse>> {
    return apiClient.post('/auth/register', payload);
  },

  async login(payload: { email: string; password: str }): Promise<ApiResponse<TokenResponse>> {
    const response: ApiResponse<TokenResponse> = await apiClient.post('/auth/login', payload);
    if (typeof window !== 'undefined' && response.success) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    return response;
  },

  async logout(): Promise<ApiResponse<{ logged_out: boolean }>> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') || '' : '';
    const response: ApiResponse<{ logged_out: boolean }> = await apiClient.post('/auth/logout', { refresh_token: refreshToken });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    return response;
  },

  async getCurrentUser(): Promise<ApiResponse<UserProfileDTO>> {
    return apiClient.get('/users/me');
  },
};
