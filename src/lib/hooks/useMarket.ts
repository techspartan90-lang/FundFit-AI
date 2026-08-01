import { useQuery } from '@tanstack/react-query';
import { marketService } from '../api/services/marketService';

export const useMarket = () => {
  const overviewQuery = useQuery({
    queryKey: ['market', 'overview'],
    queryFn: () => marketService.getMarketOverview().then((res) => res.data),
    refetchInterval: 1000 * 30, // Poll every 30 seconds
  });

  const regimeQuery = useQuery({
    queryKey: ['market', 'regime'],
    queryFn: () => marketService.getMarketRegime().then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });

  return {
    overview: overviewQuery.data,
    regime: regimeQuery.data,
    isLoading: overviewQuery.isLoading,
  };
};
