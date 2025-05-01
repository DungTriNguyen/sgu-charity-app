import { api } from '@/services/api-client';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await signIn('credentials', {
        callbackUrl: '/',
        redirect: true,
        email,
        password,
      });
    },
    onSuccess: () => {
      toast.success('Đăng nhập thành công!', { duration: 5000 });
    },
    onError: (error) => {
      toast.error(`Đăng nhập thất bại: ${error.message}`, { duration: 5000 });
    },
  });
};

export { useLoginMutation };
