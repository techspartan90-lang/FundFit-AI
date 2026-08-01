import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '../api/services/portfolioService';

export const usePortfolio = (portfolioId: string = 'default') => {
  const queryClient = useQueryClient();

  const summaryQuery = useQuery({
    queryKey: ['portfolio', portfolioId, 'summary'],
    queryFn: () => portfolioService.getPortfolioSummary(portfolioId).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });

  const holdingsQuery = useQuery({
    queryKey: ['portfolio', portfolioId, 'holdings'],
    queryFn: () => portfolioService.getPortfolioHoldings(portfolioId).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });

  const allocationQuery = useQuery({
    queryKey: ['portfolio', portfolioId, 'allocation'],
    queryFn: () => portfolioService.getPortfolioAllocation(portfolioId).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });

  const createPortfolioMutation = useMutation({
    mutationFn: (payload: { name: string; description?: string }) => portfolioService.createPortfolio(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });

  return {
    summary: summaryQuery.data,
    holdings: holdingsQuery.data || [],
    allocation: allocationQuery.data,
    isLoading: summaryQuery.isLoading || holdingsQuery.isLoading,
    createPortfolio: createPortfolioMutation.mutateAsync,
  };
};
