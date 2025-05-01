'use client';
import { PAYMENT_METHOD_CODE } from '@/app/enum';
import { useDepartmentQuery } from '@/hooks/use-department';
import { useDonateMutation } from '@/hooks/use-donation';
import {
  useCreateMomoPaymentMutation,
  useCreateVNPayPaymentMutation,
  usePaymentQuery,
} from '@/hooks/use-payment';
import { formatCurrencyToVND } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
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
import { Checkbox } from '../ui/checkbox';
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

const paymentMethodTransfer = {
  id: 1,
  name: 'Ngân hàng Vietcombank',
  icon: '/transfer_payment.png',
  account_number: '1234567890',
  account_name: 'Nguyễn Văn A',
  code: '1234567890',
};

const DonateForm = ({ projectId }: { projectId: number }) => {
  // const params = useParams();
  // const projectId = params?.id || 0;
  const { data } = useDepartmentQuery();
  const { mutate: donateMutate } = useDonateMutation();
  const { mutate: createMomoPaymentMutate } = useCreateMomoPaymentMutation();
  const { mutate: createVNPayPaymentMutate } = useCreateVNPayPaymentMutation();
  const { data: paymentData } = usePaymentQuery();
  const { data: session } = useSession();

  const formSchema = z.object({
    amount: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    name: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    email: z.string().nullable().optional(),
    phone_number: z.string().nullable().optional(),
    student_code: z.string().nullable().optional(),
    class: z.string().nullable().optional(),
    department_id: z.string().nullable().optional(),
    is_anonymous: z.boolean().nullable().optional(),
    payment_method_code: z.string().min(1, {
      message: 'Vui lòng chọn phương thức thanh toán',
    }),
    // account_number: z.string().min(1, {
    //   message: 'Thông tin không được trống',
    // }),
    // account_name: z.string().min(1, {
    //   message: 'Thông tin không được trống',
    // }),
    // code: z.string().min(1, {
    //   message: 'Thông tin không được trống',
    // }),
    // note: z.string().nullable().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      amount: '',
      name: '',
      email: '',
      phone_number: '',
      student_code: '',
      class: '',
      department_id: '',
      is_anonymous: false,
      payment_method_code: '',
      // account_number: '',
      // account_name: '',
      // code: '',
      // note: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Gọi API tạo donation
    donateMutate(
      {
        ...values,
        user_id: session?.user.detail?.id || null,
        project_id: +projectId,
        amount: +values.amount,
        payment_method_code: values.payment_method_code,
        email: values.email || null,
        phone_number: values.phone_number || null,
        student_code: values.student_code || null,
        class: values.class || null,
        department_id: values.department_id || null,
        is_anonymous: values.is_anonymous || false,
      },
      {
        onSuccess: (data) => {
          if (data?.data?.id) {
            if (values.payment_method_code === PAYMENT_METHOD_CODE.VNPAY) {
              createVNPayPaymentMutate(
                {
                  donation_id: data.data.id,
                },
                {
                  onSuccess: (paymentData) => {
                    if (paymentData?.data?.payment_url) {
                      window.location.href = paymentData.data.payment_url;
                    }
                  },
                }
              );
            } else if (
              values.payment_method_code === PAYMENT_METHOD_CODE.MOMO
            ) {
              createMomoPaymentMutate(
                {
                  donation_id: data.data.id,
                },
                {
                  onSuccess: (paymentData) => {
                    if (paymentData?.data?.payUrl) {
                      window.location.href = paymentData.data.payUrl;
                    }
                  },
                }
              );
            }
          }
        },
      }
    );
  };
  // const selectedPaymentMethod = paymentData?.data.find(
  //   (item: TPaymentMethod) =>
  //     item.id.toString() === form.watch('payment_method_id')
  // );

  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>Thông tin ủng hộ </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-4'
          >
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>
                    Nhập số tiền ủng hộ <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type='text'
                        className='text-2xl text-primary font-bold pr-16'
                        placeholder='1.000.000'
                        {...field}
                        value={
                          field.value
                            ? formatCurrencyToVND(Number(field.value))
                            : ''
                        }
                        onChange={(e) => {
                          // Loại bỏ tất cả ký tự không phải số
                          const numericValue = e.target.value.replace(
                            /[^\d]/g,
                            ''
                          );
                          // Cập nhật giá trị cho form
                          field.onChange(numericValue);
                        }}
                      />
                      <div className='absolute right-4 top-1 bottom-0 m-auto font-bold text-lg text-primary'>
                        VND
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>
                    Họ và tên <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Họ và tên' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Email'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Điện thoại'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='col-span-2'>
              <p className='font-bold'>Thông tin của bạn</p>
              <p className='italic'>
                Nếu bạn là sinh viên của trường đại học Sài Gòn
              </p>
            </div>
            <FormField
              control={form.control}
              name='student_code'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>MSSV</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='MSSV'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='class'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Lớp</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Lớp'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='department_id'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Khoa</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                    value={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Khoa' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.data.map((item: TDepartment) => (
                        <SelectItem value={`${item.id}`} key={`${item.id}`}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='is_anonymous'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 col-span-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Ủng hộ ẩn danh</FormLabel>
                    {/* <FormDescription>Ủng hộ ẩn danh</FormDescription> */}
                  </div>
                </FormItem>
              )}
            />

            <div className='col-span-2'>
              <p className='font-bold'>Phương thức thanh toán</p>
            </div>

            <FormField
              control={form.control}
              name='payment_method_code'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>
                    Chọn phương thức thanh toán{' '}
                    <span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn phương thức thanh toán' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentData?.data.map((item: TPaymentMethod) => (
                        <SelectItem key={item.id} value={item.code}>
                          <div className='flex items-center gap-2'>
                            <Image
                              src={item.icon || ''}
                              alt={item.name || ''}
                              width={24}
                              height={24}
                            />
                            <span>{item.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {PAYMENT_METHOD_CODE.BANK_TRANSFER ===
              form.watch('payment_method_code') && (
              <div className='flex flex-col col-span-2  items-center justify-center'>
                <div className='flex flex-col gap-2 items-center justify-center'>
                  <p className='font-bold mt-4'>Thông tin chuyển khoản</p>
                  <div className='w-full h-full flex'>
                    <Image
                      src={paymentMethodTransfer?.icon || ''}
                      alt={paymentMethodTransfer?.name || ''}
                      width={400}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* <FormField
              control={form.control}
              name='account_name'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Chủ tài khoản</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Họ và tên' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='account_number'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Số tài khoản</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Số tài khoản' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Code' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Nội dung'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />*/}
            <Button
              type='submit'
              className='col-span-2 mt-4'
              disabled={!form.formState.isValid}
            >
              Ủng hộ
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DonateForm;
