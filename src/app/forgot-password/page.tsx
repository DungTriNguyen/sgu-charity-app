'use client';
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useLoginMutation } from '@/hooks/use-login';
// import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

const ForgotPasswordPage = () => {
  // const searchParams = useSearchParams();
  // const error = searchParams.get('error');

  // const formSchema = z.object({
  //   email: z.string().email({
  //     message: 'Email không hợp lệ',
  //   }),
  // });

  // const { mutate: loginAction, isPending, isSuccess } = useLoginMutation();

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   mode: 'onChange',
  //   defaultValues: {
  //     email: '',
  //   },
  // });

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   const { email } = values;
  //   // Add empty password to satisfy type requirements
  //   loginAction({ email, password: '' });
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     form.reset();
  //   }
  // }, [isSuccess, form]);

  // useEffect(() => {
  //   if (error) {
  //     form.setError('email', {
  //       message: error,
  //     });
  //   }
  // }, [error, form]);

  return (
    <div className='bg-login-background min-h-screen w-full bg-cover object-contain bg-no-repeat flex justify-center items-center p-4 sm:p-6'>
      <Card className='w-full max-w-[480px]'>
        <CardHeader className='space-y-4'>
          <div className='flex items-center'>
            <Link href='/login' className='inline-block'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
            <CardTitle className='text-center font-bold text-xl sm:text-2xl flex-1'>
              Quên mật khẩu
            </CardTitle>
          </div>
          <CardDescription className='text-sm sm:text-base text-center'>
            Hãy nhập địa chỉ email của bạn. Chúng tôi sẽ gửi cho bạn mã xác thực
            để truy cập lại vào tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* <Form {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                disabled={!form.formState.isValid || isPending}
                className='w-full'
              >
                Tiếp tục
              </Button>
            </form>
          </Form> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
