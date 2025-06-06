'use client';
import { queryClient } from '@/app/providers/client';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAxiosAuth } from './use-axios-auth';

const useVolunteerQuery = ({
  limit,
  page,
  projectId,
  keyword,
  user_id,
  status,
  status_not_in,
  projects_belong_to_user_id,
}: {
  limit: number;
  page: number;
  projectId: number | null;
  keyword?: string | null;
  user_id?: number;
  status?: number;
  status_not_in?: number;
  projects_belong_to_user_id?: number;
}): UseQueryResult<TApiResponse<TSVolunteer>, Error> => {
  const apiAuth = useAxiosAuth();
  return useQuery<TApiResponse<TSVolunteer>, Error>({
    queryKey: [
      'get_volunteer',
      limit,
      page,
      projectId,
      keyword,
      user_id,
      status,
      status_not_in,
      projects_belong_to_user_id,
    ],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/volunteer', {
          params: {
            limit,
            page,
            project_id: projectId,
            keyword,
            user_id,
            status,
            status_not_in,
            projects_belong_to_user_id,
          },
        });
        return res.data;
      } catch (e: any) {
        throw Error(e?.response?.data?.message);
      }
    },
  });
};

const useRegisterVolunteerMutation = () => {
  const apiAuth = useAxiosAuth();
  return useMutation({
    mutationKey: ['project_id'],
    mutationFn: async (payload: TRegisterVolunteerForm) => {
      try {
        const res = await apiAuth.post('/volunteer', {
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

export { useRegisterVolunteerMutation, useVolunteerQuery };
