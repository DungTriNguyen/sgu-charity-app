import { useQuery } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';

const useGetStatisticQuery = () => {
  const apiAuth = useAxiosAuth();
  return useQuery<TStatisticData>({
    queryKey: ['statistic'],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/statistic');
        return res.data;
      } catch (e: any) {
        throw Error(e?.response?.data?.message);
      }
    },
    // enabled: !!token,
    // Caching options
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export { useGetStatisticQuery };
