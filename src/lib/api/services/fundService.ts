import { apiClient } from '../client';
import { ApiResponse, MutualFundDTO } from '@/types/api';

export const fundService = {
  async searchFunds(params?: { q?: string; category?: string; min_return?: number; max_expense_ratio?: number; page?: number; page_size?: number }): Promise<ApiResponse<MutualFundDTO[]>> {
    return apiClient.get('/funds/search', { params });
  },

  async getFundDetail(fundId: string): Promise<ApiResponse<MutualFundDTO>> {
    return apiClient.get(`/funds/${fundId}`);
  },

  async compareFunds(fundIds: string[]): Promise<ApiResponse<Record<string, any>[]>> {
    return apiClient.post('/funds/compare', { fund_ids: fundIds });
  },

  async getFundHoldings(fundId: string): Promise<ApiResponse<Record<string, any>[]>> {
    return apiClient.get(`/funds/${fundId}/holdings`);
  },

  async getFundRiskMetrics(fundId: string): Promise<ApiResponse<Record<string, number>>> {
    return apiClient.get(`/funds/${fundId}/risk-metrics`);
  },

  async getCategories(): Promise<ApiResponse<Record<string, any>[]>> {
    return apiClient.get('/funds/categories');
  },

  async getRankings(category?: string): Promise<ApiResponse<Record<string, any>[]>> {
    return apiClient.get('/funds/ranking', { params: { category } });
  },
};
