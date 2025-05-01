import { SETTING_TYPE } from '@/app/enum';
import { useQuery } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';

const useGetSettingPage = ({ key }: { key?: SETTING_TYPE }) => {
  const apiAuth = useAxiosAuth();
  return useQuery<TSSetting>({
    queryKey: ['setting_page', key],
    queryFn: async () => {
      try {
        const res = await apiAuth.get(`/setting/value/${key}`);
        // console.log('API Response:', res.data);
        return res.data;
      } catch (e: any) {
        throw Error(e?.response?.data?.message);
      }
    },
    // enabled: !!token,
  });
};

export { useGetSettingPage };
