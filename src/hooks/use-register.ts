import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAxiosAuth } from './use-axios-auth';

const usePostRegisterMutation = () => {
  const apiAuth = useAxiosAuth();
  const router = useRouter();

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
      toast.success('Thành công', {
        description: 'Đăng ký tài khoản thành công',
        duration: 5000,
      });

      setTimeout(() => {
        router.push('/login');
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

function parseApiError(error: any): string {
  const resData = error?.response?.data;

  if (resData?.message) return resData.message;
  const errors = resData?.errors;
  if (errors && typeof errors === 'object') {
    const firstErrorArray = Object.values(errors)[0];
    if (Array.isArray(firstErrorArray)) {
      return firstErrorArray[0];
    }
  }

  return 'Đã xảy ra lỗi không xác định.';
}

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
        description: parseApiError(error),
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
        description: parseApiError(error),
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
