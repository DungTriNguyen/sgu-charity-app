import { useQuery } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';
import { AxiosError } from 'axios';

const useGetCategoryQuery = () => {
  const apiAuth = useAxiosAuth();
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/category', {
          params: {
            status: 1,
          },
        });
        return res.data;
      } catch (e) {
        const error = e as AxiosError;
        throw Error(
          error.response?.data?.message || 'Failed to fetch categories'
        );
      }
    },
  });
};

export { useGetCategoryQuery };
