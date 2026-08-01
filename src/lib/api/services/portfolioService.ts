import { apiClient } from '../client';
import { ApiResponse, PortfolioHoldingDTO, PortfolioSummaryDTO } from '@/types/api';

export const portfolioService = {
  async getPortfolioSummary(portfolioId: string): Promise<ApiResponse<PortfolioSummaryDTO>> {
    return apiClient.get(`/portfolio/${portfolioId}/summary`);
  },

  async getPortfolioHoldings(portfolioId: string): Promise<ApiResponse<PortfolioHoldingDTO[]>> {
    return apiClient.get(`/portfolio/${portfolioId}/holdings`);
  },

  async getPortfolioAllocation(portfolioId: string): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get(`/portfolio/${portfolioId}/allocation`);
  },

  async getPortfolioPerformance(portfolioId: string): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get(`/portfolio/${portfolioId}/performance`);
  },

  async createPortfolio(payload: { name: string; description?: string; is_default?: boolean }): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.post('/portfolio', payload);
  },

  async updatePortfolio(portfolioId: string, payload: { name: string; description?: string }): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.put(`/portfolio/${portfolioId}`, payload);
  },

  async deletePortfolio(portfolioId: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete(`/portfolio/${portfolioId}`);
  },
};
