import { useQuery } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const usePaymentQuery = () => {
  const apiAuth = useAxiosAuth();

  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/payment-method');
        return res.data;
      } catch (error: any) {
        console.error('Fetch payment methods error:', error);
        throw new Error(
          error?.response?.data?.message ||
            'Có lỗi xảy ra khi lấy danh sách phương thức thanh toán'
        );
      }
    },
  });
};

export const useCreateMomoPaymentMutation = () => {
  const apiAuth = useAxiosAuth();

  return useMutation({
    mutationFn: async (payload: { donation_id: number }) => {
      try {
        const res = await apiAuth.post<TMomoPaymentResponse>(
          '/payment-method/momo/create-payment',
          payload
        );
        return res.data;
      } catch (error: any) {
        console.error('Payment creation error:', error);
        throw new Error(
          error?.response?.data?.message || 'Có lỗi xảy ra khi tạo thanh toán'
        );
      }
    },
    onSuccess: (data) => {
      toast('Thông báo', {
        description: data.data.message || 'Tạo thanh toán thành công',
      });
    },
    onError: (error: Error) => {
      toast('Thông báo', {
        description: error.message || 'Có lỗi xảy ra khi tạo thanh toán',
      });
    },
  });
};

export const useCreateVNPayPaymentMutation = () => {
  const apiAuth = useAxiosAuth();

  return useMutation({
    mutationFn: async (payload: { donation_id: number }) => {
      try {
        const res = await apiAuth.post<TVNPayPaymentResponse>(
          '/payment-method/vnpay/create-payment',
          payload
        );
        return res.data;
      } catch (error: any) {
        console.error('Payment creation error:', error);
        throw new Error(
          error?.response?.data?.message || 'Có lỗi xảy ra khi tạo thanh toán'
        );
      }
    },
    onSuccess: (data) => {
      toast('Thông báo', {
        description: data.message || 'Tạo thanh toán thành công',
      });
    },
    onError: (error: Error) => {
      toast('Thông báo', {
        description: error.message || 'Có lỗi xảy ra khi tạo thanh toán',
      });
    },
  });
};
