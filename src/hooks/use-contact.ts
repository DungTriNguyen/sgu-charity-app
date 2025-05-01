import { useMutation } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';
import { toast } from 'sonner';

const usePostContactMutation = () => {
  const apiAuth = useAxiosAuth();

  return useMutation<TApiResponse, Error, TContactFormData>({
    mutationFn: async (contactFormData) => {
      try {
        const res = await apiAuth.post<TApiResponse>(
          '/contact/store',
          contactFormData
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
        description: 'Thông tin đã được gửi thành công',
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

export { usePostContactMutation };
