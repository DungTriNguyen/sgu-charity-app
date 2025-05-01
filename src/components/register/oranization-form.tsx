'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { usePostRegisterOrganizationMutation } from '@/hooks/use-register';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import DropzoneForm from '@/app/dropzone-form';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Thông tin không được trống',
  }),
  birth: z.date().refine((date) => !isNaN(date.getTime()), {
    message: 'Thông tin không được trống',
  }),
  name: z.string().min(1, {
    message: 'Thông tin không được trống',
  }),
  representative_email: z
    .string()
    .min(1, {
      message: 'Thông tin không được trống',
    })
    .email({ message: 'Không đúng định dạng email' }),
  address: z.string().min(1, {
    message: 'Thông tin không được trống',
  }),
  representative_phone_number: z
    .string()
    .min(1, {
      message: 'Thông tin không được trống',
    })
    .max(10, {
      message: 'Số điện thoại không được quá 11 ký tự',
    })
    .regex(
      new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      {
        message: 'Không đúng định dạng số điện thoại',
      }
    ),
  representative_name: z.string().min(1, {
    message: 'Thông tin không được trống',
  }),
  field: z.string().min(1, {
    message: 'Thông tin không được trống',
  }),

  website: z
    .string()
    .min(1, {
      message: 'Thông tin không được trống',
    })
    .regex(
      new RegExp(
        /^(https?:\/\/)?(([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})|(\d{1,3}(\.\d{1,3}){3})|(\[[a-fA-F0-9:]+\]))(:\d{1,5})?(\/.*)?$/
      ),
      {
        message: 'Không đúng định dạng website',
      }
    ),

  related_images: z
    .array(
      z.object({
        name: z.string(),
        base64: z.string(),
      })
    )
    .optional()
    .nullable(),
  information: z.string().min(1, {
    message: 'Thông tin không được trống',
  }),
});

const OrganizationForm = () => {
  const { mutate, isPending } = usePostRegisterOrganizationMutation();
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      birth: new Date(),
      website: '',
      field: '',
      address: '',
      username: '',
      information: '',
      representative_name: '',
      representative_phone_number: '',
      representative_email: '',
      related_images: [],
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data as TRegisterOrganizationForm, {
      onSuccess: () => {
        // Reset form after successful submission
        form.reset({
          name: '',
          birth: new Date(),
          website: '',
          field: '',
          address: '',
          username: '',
          information: '',
          representative_name: '',
          representative_phone_number: '',
          representative_email: '',
          related_images: [],
        });
        // Force re-render of DropzoneForm
        setDropzoneKey((prev) => prev + 1);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel className='text-sm md:text-base font-medium text-gray-700'>
                Tên đăng nhập <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Tên đăng nhập'
                  className='transition-colors duration-300 focus:border-primary focus:ring-primary'
                />
              </FormControl>
              <FormMessage className='text-red-500 text-sm' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='birth'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel className='block text-sm md:text-base font-medium text-gray-700'>
                Ngày thành lập <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full md:w-[240px] justify-start text-left font-normal transition-colors duration-300 hover:bg-primary/5',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4 text-primary' />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      toDate={new Date()}
                      className='rounded-md border shadow-md'
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className='text-red-500 text-sm' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>
                Tên tổ chức <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder='Tên tổ chức' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='representative_email'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>
                Email người đại diện <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder='Email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>
                Địa chỉ <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder='Địa chỉ' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='representative_phone_number'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>
                Số điện thoại người đại diện{' '}
                <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Input type='number' {...field} placeholder='Số điện thoại' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='representative_name'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>
                Tên người đại diện <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder='Tên người đại diện' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='field'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>
                Lĩnh vực <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder='Lĩnh vực' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>
                Link website <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder='Website' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='col-span-1 md:col-span-2'>
          <FormField
            control={form.control}
            name='related_images'
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-700'>
                  Hình ảnh
                </FormLabel>
                <FormControl>
                  <div className='w-full'>
                    <DropzoneForm
                      key={dropzoneKey}
                      defaultValue={field.value as TUploadImage[]}
                      onChange={(e) => field.onChange(e as TUploadImage[])}
                      isError={!!formState?.errors?.related_images?.message}
                    />
                  </div>
                </FormControl>
                <FormMessage className='text-red-500 text-sm' />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='information'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel>
                Thông tin tổ chức <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Thông tin tổ chức' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='col-span-1 md:col-span-2 flex justify-center'>
          <Button
            type='submit'
            disabled={isPending || !form.formState.isValid}
            className='bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending ? 'Đang gửi...' : 'Gửi'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrganizationForm;
