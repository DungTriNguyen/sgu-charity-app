'use client';
import { useDepartmentQuery } from '@/hooks/use-department';
import { useRegisterVolunteerMutation } from '@/hooks/use-volunteer';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useGetUserProfileQuery } from '@/hooks/use-profile';
import { useSession } from 'next-auth/react';

const RegisterVolunteerForm = ({ projectId }: { projectId: number }) => {
  // const params = useParams();
  // const projectId = params?.id || 0;
  const { mutate, isPending } = useRegisterVolunteerMutation();
  const { data: departments } = useDepartmentQuery();
  const { data: userProfile, isLoading: isLoadingProfile } =
    useGetUserProfileQuery();
  const { data: session } = useSession();

  const formSchema = z.object({
    name: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    email: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    phone_number: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    student_code: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    class: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    department_id: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      student_code: '',
      class: '',
      department_id: '',
    },
    values: {
      name: userProfile?.data?.name || '',
      email: userProfile?.data?.email || '',
      phone_number: userProfile?.data?.phone_number || '',
      student_code: userProfile?.data?.student_code || '',
      class: userProfile?.data?.class || '',
      department_id: userProfile?.data?.department?.id?.toString() || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user?.detail?.id) {
      console.error('User ID not found in session');
      return;
    }

    try {
      await mutate({
        ...values,
        department_id: +values.department_id,
        project_id: +projectId,
        user_id: session.user.detail.id,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isLoadingProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <Card className=''>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle className='text-lg md:text-xl lg:text-2xl'>
          Thông tin tham gia tình nguyện
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='p-4 md:p-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='col-span-1 md:col-span-2'>
                  <FormLabel className='text-sm md:text-base'>
                    Họ và tên <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Họ và tên'
                      className='text-sm md:text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs md:text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel className='text-sm md:text-base'>
                    Email <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Email'
                      className='text-sm md:text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs md:text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel className='text-sm md:text-base'>
                    Số điện thoại <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Điện thoại'
                      className='text-sm md:text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs md:text-sm' />
                </FormItem>
              )}
            />
            <div className='col-span-1 md:col-span-2'>
              <p className='font-bold text-sm md:text-base'>
                Thông tin của bạn
              </p>
              <p className='italic text-xs md:text-sm'>
                Vui lòng điền thông tin sinh viên để được tham gia vào dự án
              </p>
            </div>
            <FormField
              control={form.control}
              name='student_code'
              render={({ field }) => (
                <FormItem className='col-span-1 md:col-span-2'>
                  <FormLabel className='text-sm md:text-base'>
                    MSSV <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='MSSV'
                      className='text-sm md:text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs md:text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='class'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel className='text-sm md:text-base'>
                    Lớp <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Lớp'
                      className='text-sm md:text-base'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs md:text-sm' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='department_id'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel className='text-sm md:text-base'>
                    Khoa <span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className='text-sm md:text-base'>
                        <SelectValue placeholder='Khoa' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments?.data.map((item: TDepartment) => (
                        <SelectItem
                          value={`${item.id}`}
                          key={`${item.id}`}
                          className='text-sm md:text-base'
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='col-span-1 md:col-span-2 mt-2 md:mt-4 text-sm md:text-base'
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? 'Đang xử lý...' : 'Tham gia'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterVolunteerForm;
