'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useChangePasswordMutation } from '@/hooks/use-profile';

const formSchema = z.object({
  old_password: z.string().min(1, { message: 'Thông tin không được trống' }),
  new_password: z.string().min(1, { message: 'Thông tin không được trống' }),
  new_password_confirmation: z.string().min(1, {
    message: 'Thông tin không được trống',
  }),
});

const UserChangePassword = () => {
  const { mutate } = useChangePasswordMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updateData = {
      old_password: values.old_password,
      new_password: values.new_password,
      new_password_confirmation: values.new_password_confirmation,
    };
    mutate(updateData);
  }

  // if (isLoading) {
  //   return <div>Đang tải dữ liệu...</div>;
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-1 md:grid-cols-2 w-full max-w-xl gap-6 p-2 md:p-6 mx-auto'
      >
        <FormField
          control={form.control}
          name='old_password'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel className='text-sm md:text-base font-medium text-gray-700'>
                Mật khẩu cũ <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Mật khẩu cũ'
                  {...field}
                  value={field.value ?? ''}
                  className='transition-colors duration-300 focus:border-primary focus:ring-primary'
                />
              </FormControl>
              <FormMessage className='text-red-500 text-sm' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='new_password'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel className='text-sm md:text-base font-medium text-gray-700'>
                Mật khẩu mới <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Mật khẩu mới'
                  {...field}
                  value={field.value ?? ''}
                  className='transition-colors duration-300 focus:border-primary focus:ring-primary'
                />
              </FormControl>
              <FormMessage className='text-red-500 text-sm' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='new_password_confirmation'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel className='text-sm md:text-base font-medium text-gray-700'>
                Nhập lại mật khẩu mới <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Nhập lại mật khẩu mới'
                  {...field}
                  value={field.value ?? ''}
                  className='transition-colors duration-300 focus:border-primary focus:ring-primary'
                />
              </FormControl>
              <FormMessage className='text-red-500 text-sm' />
            </FormItem>
          )}
        />

        <div className='col-span-2 flex justify-center'>
          <Button
            type='submit'
            disabled={!form.formState.isValid}
            className='bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserChangePassword;
