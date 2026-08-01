import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/services/authService';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: () => authService.getCurrentUser().then((res) => res.data),
    staleTime: 1000 * 60 * 15, // 15 mins
    retry: 1,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: str }) => authService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
  };
};
