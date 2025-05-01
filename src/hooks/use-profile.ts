import { queryClient } from '@/app/providers/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAxiosAuth } from './use-axios-auth';

const useGetUserProfileQuery = () => {
  const apiAuth = useAxiosAuth();
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/user/profile');
        // console.log('user-profile:', res.data);
        return res.data;
      } catch (e: any) {
        throw Error(e);
      }
    },
  });
};

const useGetListUserProfileQuery = ({
  type,
  limit,
  page,
  username,
  search,
}: {
  type?: string;
  limit?: number;
  page?: number;
  username?: string;
  search?: string;
}) => {
  const apiAuth = useAxiosAuth();
  return useQuery({
    queryKey: ['user-profile-list', type, search, username, limit, page],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/user', {
          params: { type, keyword: search, username, limit, page },
        });
        return res.data;
      } catch (e: any) {
        throw Error(e);
      }
    },
  });
};

const useUpdateUserProfileMutation = () => {
  const apiAuth = useAxiosAuth();
  return useMutation({
    mutationKey: ['user-profile'],
    mutationFn: async (payload: TUserUpdate) => {
      try {
        const res = await apiAuth.put('/user/profile', {
          ...payload,
          department_id: payload.department_id ? +payload.department_id : null,
        });
        return res.data;
      } catch (error) {
        console.error('Update profile error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast('Thông báo', {
        description: data.message,
      });
      // Chỉ invalidate query user-profile
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
    onError: (error: any) => {
      console.error('Mutation error:', error);
      toast('Thông báo', {
        description: error.response?.data?.message || 'Có lỗi xảy ra',
      });
    },
  });
};

const useUpdateUserAvatarMutation = () => {
  const apiAuth = useAxiosAuth();
  return useMutation({
    mutationKey: ['user-avatar'],
    mutationFn: async (payload: TUploadImage) => {
      try {
        const res = await apiAuth.put('/user/avatar', payload);
        return res.data;
      } catch (e: any) {
        throw Error(e);
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
      queryClient.invalidateQueries();
    },
  });
};

const useChangePasswordMutation = () => {
  const apiAuth = useAxiosAuth();
  return useMutation({
    mutationKey: ['user-password'],
    mutationFn: async (payload: any) => {
      try {
        const res = await apiAuth.put('/user/password', payload);
        return res.data;
      } catch (e: any) {
        throw Error(e);
      }
    },
    onSuccess: (data) => {
      toast('Thông báo', {
        description: data.message,
      });
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      toast('Thông báo', {
        description: error.response?.data?.message || 'Có lỗi xảy ra',
      });
    },
  });
};

export {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetListUserProfileQuery,
  useUpdateUserAvatarMutation,
  useChangePasswordMutation,
};
