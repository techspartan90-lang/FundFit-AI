import { apiClient } from '../client';
import { ApiResponse, MarketOverviewDTO } from '@/types/api';

export const marketService = {
  async getMarketOverview(): Promise<ApiResponse<MarketOverviewDTO>> {
    return apiClient.get('/market/overview');
  },

  async getNiftyQuote(): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get('/market/nifty');
  },

  async getVixQuote(): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get('/market/vix');
  },

  async getSectorPerformance(): Promise<ApiResponse<Record<string, any>[]>> {
    return apiClient.get('/market/sectors');
  },

  async getEconomicIndicators(): Promise<ApiResponse<Record<string, any>[]>> {
    return apiClient.get('/market/economic-indicators');
  },

  async getMarketRegime(): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.get('/market/regime');
  },
};
