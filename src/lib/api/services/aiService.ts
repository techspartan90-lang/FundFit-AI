import { apiClient } from '../client';
import { ApiResponse, FundFitScoreResult, RecommendationResult, ExplainableAIResult } from '@/types/api';

export const aiService = {
  async analyzeRisk(surveyRiskScore: number, historicalReturns?: number[]): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.post('/ai/risk-analysis', { survey_risk_score: surveyRiskScore, historical_returns: historicalReturns });
  },

  async profileInvestor(payload: Record<string, any>): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.post('/ai/investor-profiling', payload);
  },

  async computeFundFitScore(fundData: any, investorProfile: any, marketRegime: any): Promise<ApiResponse<FundFitScoreResult>> {
    return apiClient.post('/ai/fund-fit-score', { fund_data: fundData, investor_profile: investorProfile, market_regime: marketRegime });
  },

  async generateRecommendation(payload: Record<string, any>): Promise<ApiResponse<RecommendationResult>> {
    return apiClient.post('/ai/recommendations', payload);
  },

  async evaluatePortfolioHealth(payload: Record<string, any>): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.post('/ai/portfolio-health', payload);
  },

  async simulateGoalProbability(targetAmount: number, currentAmount: number, monthlySip: number, timeHorizonYears: number): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.post('/ai/goal-probability', {
      target_amount: targetAmount,
      current_amount: currentAmount,
      monthly_sip: monthlySip,
      time_horizon_years: timeHorizonYears,
    });
  },

  async getExplainableRecommendation(action: string, fundData: any, investorProfile: any, fitScoreBreakdown: any): Promise<ApiResponse<ExplainableAIResult>> {
    return apiClient.post('/ai/explain-recommendation', {
      action,
      fund_data: fundData,
      investor_profile: investorProfile,
      fit_score_breakdown: fitScoreBreakdown,
    });
  },
};
