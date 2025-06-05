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
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!result?.ok) {
        throw new Error(result?.error || 'Đăng nhập thất bại.');
      }

      return result;
    },
    onSuccess: () => {
      toast.success('Đăng nhập thành công!', { duration: 5000 });
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    },
    onError: (error) => {
      toast.error(`Đăng nhập thất bại: ${error.message}`, { duration: 5000 });
    },
  });
};

export { useLoginMutation };
