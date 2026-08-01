import { useMutation } from '@tanstack/react-query';
import { aiService } from '../api/services/aiService';

export const useAI = () => {
  const computeFitScoreMutation = useMutation({
    mutationFn: (params: { fundData: any; investorProfile: any; marketRegime: any }) =>
      aiService.computeFundFitScore(params.fundData, params.investorProfile, params.marketRegime),
  });

  const generateRecommendationMutation = useMutation({
    mutationFn: (payload: Record<string, any>) => aiService.generateRecommendation(payload),
  });

  const simulateGoalMutation = useMutation({
    mutationFn: (params: { targetAmount: number; currentAmount: number; monthlySip: number; timeHorizonYears: number }) =>
      aiService.simulateGoalProbability(params.targetAmount, params.currentAmount, params.monthlySip, params.timeHorizonYears),
  });

  const getExplainableRecommendationMutation = useMutation({
    mutationFn: (params: { action: string; fundData: any; investorProfile: any; fitScoreBreakdown: any }) =>
      aiService.getExplainableRecommendation(params.action, params.fundData, params.investorProfile, params.fitScoreBreakdown),
  });

  return {
    computeFundFitScore: computeFitScoreMutation.mutateAsync,
    isComputingFitScore: computeFitScoreMutation.isPending,
    generateRecommendation: generateRecommendationMutation.mutateAsync,
    simulateGoalProbability: simulateGoalMutation.mutateAsync,
    isSimulatingGoal: simulateGoalMutation.isPending,
    getExplainableRecommendation: getExplainableRecommendationMutation.mutateAsync,
  };
};
