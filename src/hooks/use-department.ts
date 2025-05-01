import { useQuery } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';

const useDepartmentQuery = () => {
  const apiAuth = useAxiosAuth();
  return useQuery({
    queryKey: ['department'],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/department');
        // console.log('department:', res.data);
        return res.data;
      } catch (e: any) {
        throw Error(e?.response?.data?.message);
      }
    },
  });
};

export { useDepartmentQuery };
