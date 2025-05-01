'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { usePostContactMutation } from '@/hooks/use-contact';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const ContactForm = () => {
  const { mutate, isSuccess, isPending } = usePostContactMutation();
  const formSchema = z.object({
    name: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    email: z
      .string()
      .min(1, {
        message: 'Thông tin không được trống',
      })
      .email({ message: 'Không đúng định dạnh email' }),
    phone_number: z
      .string()
      .min(1, {
        message: 'Thông tin không được trống',
      })
      .max(11, {
        message: 'Số điện thoại không được quá 11 ký tự',
      })
      .regex(
        new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
        {
          message: 'Không đúng định dạng số điện thoại',
        }
      ),
    subject: z.string().min(1, {
      message: 'Thông tin không được trống',
    }),
    content: z.string().min(1, {
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
      subject: '',
      content: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values);
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  return (
    <div className='max-md:ml-4 max-md:mr-4'>
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-3xl'>Liên hệ</CardTitle>
          <CardDescription>
            Nếu bạn có câu hỏi cần giải đáp, hãy điền vào biểu mẫu bên dưới.
            Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-cols-1 gap-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='col-span-1'>
                    <FormLabel>
                      Họ và tên <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        className=' '
                        placeholder='Tên'
                        {...field}
                      />
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
                    <FormLabel>
                      Email <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Email' {...field} />
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
                    <FormLabel>
                      Điện thoại <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Input type='number' placeholder='Điện thoại' {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem className='col-span-1'>
                    <FormLabel>
                      Chủ đề <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='facebook' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='col-span-1'>
                    <FormLabel>
                      Nội dung <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nội dung' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='col-span-1 flex justify-center'>
                <Button
                  type='submit'
                  disabled={isPending || !form.formState.isValid}
                >
                  Gửi liên hệ
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
