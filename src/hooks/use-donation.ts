import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';
import { toast } from 'sonner';
import { queryClient } from '@/app/providers/client';

const useDonationQuery = ({
  limit,
  page,
  projectId,
  user_id,
  projects_belong_to_user_id,
  keyword,
}: {
  limit?: number;
  page?: number;
  projectId?: number;
  user_id?: number;
  projects_belong_to_user_id?: number;
  keyword?: string;
}): UseQueryResult<TApiResponse<TSDonationData>, Error> => {
  const apiAuth = useAxiosAuth();
  return useQuery<TApiResponse<TSDonationData>, Error>({
    queryKey: [
      'get_donations',
      page,
      projectId,
      user_id,
      projects_belong_to_user_id,
      keyword,
    ],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/donation', {
          params: {
            limit,
            page,
            project_id: projectId,
            user_id,
            projects_belong_to_user_id,
            keyword,
          },
        });
        return res.data;
      } catch (e: any) {
        throw Error(e?.response?.data?.message);
      }
    },
    enabled: true,
  });
};

const useDonateMutation = () => {
  const apiAuth = useAxiosAuth();
  return useMutation({
    mutationKey: ['project_id'],
    mutationFn: async (payload: TDonateForm) => {
      try {
        const res = await apiAuth.post('/donation', {
          ...payload,
        });
        return res.data;
      } catch (e: any) {
        throw Error(e?.response?.data?.message);
      }
    },
    onSuccess: (data) => {
      toast('Thông báo', {
        description: data.message,
      });
      queryClient.invalidateQueries();
    },
    onError: (data) => {
      toast('Thông báo', {
        description: data.message,
      });
    },
  });
};

export { useDonationQuery, useDonateMutation };
