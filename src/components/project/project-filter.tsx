'use client';
import { CAMPAIGN_STATUS, CAMPAIGN_TYPE } from '@/app/enum';
import { useGetCategoryQuery } from '@/hooks/use-categories';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { useFormContext } from 'react-hook-form';
import { CloseIcon } from 'yet-another-react-lightbox';
import { z } from 'zod';
import { formSchema } from '.';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const ProjectFilter = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: categories } = useGetCategoryQuery();

  // Hàm để cập nhật URL với các params mới
  const updateUrlParams = (values: z.infer<typeof formSchema>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Cập nhật hoặc xóa params dựa trên giá trị
    if (values.keyword) {
      params.set('keyword', values.keyword);
    } else {
      params.delete('keyword');
    }

    if (values.front_status) {
      params.set('status', values.front_status);
    } else {
      params.delete('status');
    }

    if (values.type) {
      params.set('type', values.type);
    } else {
      params.delete('type');
    }

    if (values.category) {
      params.set('category', values.category);
    } else {
      params.delete('category');
    }

    // Cập nhật URL với params mới
    router.push(`/projects?${params.toString()}`);
  };

  // Lắng nghe sự thay đổi của form và cập nhật URL
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateUrlParams(value as z.infer<typeof formSchema>);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Set giá trị mặc định từ URL params khi component mount
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    if (keyword) form.setValue('keyword', keyword);
    if (status) form.setValue('front_status', status);
    if (type) form.setValue('type', type);
    if (category) form.setValue('category', category);
  }, []);

  // Reset form và xóa tất cả params trong URL
  const resetForm = () => {
    // Tạo URL mới chỉ với pathname, không có params
    const url = new URL(window.location.href);
    url.search = ''; // Xóa tất cả params

    // Reset form về giá trị mặc định
    form.reset({
      keyword: '',
      front_status: '',
      type: '',
      category: '',
    });

    // Chuyển hướng đến URL không có params
    router.push(url.pathname);
  };

  return (
    <Suspense
      fallback={
        <div className='text-center py-10'>
          Đang tải thông tin chương trình...
        </div>
      }
    >
      <Form {...form}>
        <form>
          <div className='flex flex-col md:flex-row flex-wrap justify-start lg:justify-between gap-3 max-md:p-4 md:gap-4 mb-4 md:mb-8'>
            <div className='flex items-center gap-2'>
              <FormField
                control={form.control}
                name='front_status'
                render={({ field }) => (
                  <FormItem className='w-full md:w-auto'>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateUrlParams({
                          ...form.getValues(),
                          front_status: value,
                        });
                      }}
                      value={field.value}
                      defaultValue=''
                    >
                      <FormControl>
                        <SelectTrigger className='w-full md:w-[180px]'>
                          <SelectValue placeholder='Trạng thái' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          CAMPAIGN_STATUS.IN_PROGRESS,
                          CAMPAIGN_STATUS.COMPLETED,
                          CAMPAIGN_STATUS.PENDING,
                          CAMPAIGN_STATUS.ENDED,
                        ].map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='w-full md:w-auto'>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateUrlParams({
                          ...form.getValues(),
                          category: value,
                        });
                      }}
                      value={field.value}
                      defaultValue=''
                    >
                      <FormControl>
                        <SelectTrigger className='w-full md:w-[250px]'>
                          <SelectValue placeholder='Loại chương trình' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.data?.map((item: TSCategotyData) => (
                          <SelectItem value={`${item.id}`} key={item.id}>
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
                name='type'
                render={({ field }) => (
                  <FormItem className='w-full md:w-auto'>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateUrlParams({ ...form.getValues(), type: value });
                      }}
                      value={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full md:w-[250px]'>
                          <SelectValue placeholder='Loại đóng góp' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          CAMPAIGN_TYPE.DONATE,
                          CAMPAIGN_TYPE.VOLUNTEER,
                          CAMPAIGN_TYPE.MULTIPLE,
                        ].map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex items-center gap-2'>
              <FormField
                control={form.control}
                name='keyword'
                render={({ field }) => (
                  <FormItem className='w-full md:w-auto'>
                    <FormControl>
                      <div className='relative w-full md:w-[300px]'>
                        <Input
                          type='search'
                          placeholder='Tìm kiếm tên chương trình'
                          className='w-full pr-10'
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            updateUrlParams({
                              ...form.getValues(),
                              keyword: e.target.value,
                            });
                          }}
                        />
                        <SearchIcon className='absolute right-4 top-0 bottom-0 m-auto' />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type='button'
                variant={'destructive'}
                onClick={resetForm}
                className='w-[50px] md:w-auto'
              >
                <CloseIcon />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Suspense>
  );
};

export default ProjectFilter;
