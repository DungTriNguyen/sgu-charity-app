import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Import useRouter từ next/navigation
import { toast } from 'sonner';
import { useAxiosAuth } from './use-axios-auth';

const usePostRegisterMutation = () => {
  const apiAuth = useAxiosAuth();
  const router = useRouter(); // Khởi tạo router

  return useMutation<TApiResponse, Error, TRegister>({
    mutationFn: async (registerFormData) => {
      try {
        const res = await apiAuth.post<TApiResponse>(
          '/register',
          registerFormData
        );
        return res.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'An unexpected error occurred';
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      // console.log('Contact form submitted', data);
      // Optionally invalidate or update related queries if needed
      // queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Thành công', {
        description: 'Đăng ký tài khoản thành công',
        duration: 5000,
      });

      setTimeout(() => {
        router.push('/login'); // Chuyển hướng về trang đăng nhập
      }, 2000);
    },
    onError: (error) => {
      toast.error('Lỗi', {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

const usePostRegisterIndividualMutation = () => {
  const apiAuth = useAxiosAuth();
  return useMutation<TApiResponse, Error, TRegisterIndividualForm>({
    mutationFn: async (registerFormData) => {
      const res = await apiAuth.post<TApiResponse>(
        '/account-request/individual',
        registerFormData
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success('Thành công', {
        description: data.message,
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error('Lỗi', {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

const usePostRegisterOrganizationMutation = () => {
  const apiAuth = useAxiosAuth();
  return useMutation<TApiResponse, Error, TRegisterOrganizationForm>({
    mutationFn: async (registerFormData) => {
      const res = await apiAuth.post<TApiResponse>(
        '/account-request/organization',
        registerFormData
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success('Thành công', {
        description: data.message,
        duration: 5000,
      });
    },
    onError: (error) => {
      toast.error('Lỗi', {
        description: error.message,
        duration: 5000,
      });
    },
  });
};

export {
  usePostRegisterMutation,
  usePostRegisterIndividualMutation,
  usePostRegisterOrganizationMutation,
};
