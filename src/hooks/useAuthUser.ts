import { useQuery } from '@tanstack/react-query';
import { useApiNoAuthResource } from './useApiNoAuthResource';

const ONE_HOUR = 1000 * 60 * 60;

export function useAuthUser(token: string | null, enabled: boolean = true) {
  const { authApi } = useApiNoAuthResource();

  return useQuery({
    queryKey: ['auth', 'me', token],
    queryFn: async () => {
      if (!token) throw new Error('Token não fornecido');
      
      const { data, error } = await authApi.getLogged(token);
      
      if (error) throw error;
      if (!data) throw new Error('Nenhum dado retornado');
      
      return data;
    },
    enabled: enabled && !!token,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
    retry: 1,
  });
}

