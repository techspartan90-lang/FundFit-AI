import { useQuery } from '@tanstack/react-query';
import { fundService } from '../api/services/fundService';

export const useFunds = (searchParams?: { q?: string; category?: string }) => {
  const searchQuery = useQuery({
    queryKey: ['funds', 'search', searchParams],
    queryFn: () => fundService.searchFunds(searchParams).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
  });

  const categoriesQuery = useQuery({
    queryKey: ['funds', 'categories'],
    queryFn: () => fundService.getCategories().then((res) => res.data),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    funds: searchQuery.data || [],
    categories: categoriesQuery.data || [],
    isLoading: searchQuery.isLoading,
    isError: searchQuery.isError,
  };
};

export const useFundDetail = (fundId: string) => {
  return useQuery({
    queryKey: ['fund', fundId],
    queryFn: () => fundService.getFundDetail(fundId).then((res) => res.data),
    enabled: !!fundId,
  });
};
