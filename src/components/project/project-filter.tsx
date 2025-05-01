'use client';
import { CAMPAIGN_STATUS, CAMPAIGN_TYPE } from '@/app/enum';
import { useGetCategoryQuery } from '@/hooks/use-categories';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
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

  const defaultValues = {
    front_status: '',
    category: '',
    type: '',
    keyword: '',
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if (type && form.getValues('type') !== type) {
      form.setValue('type', type);
    }
    const category = searchParams.get('category');
    if (category && form.getValues('category') !== category) {
      form.setValue('category', category);
    }
  }, [searchParams, form]);

  const resetForm = () => {
    router.push('/projects');
    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
      <form>
        <div className='flex flex-col md:flex-row flex-wrap justify-start lg:justify-between gap-3 max-md:p-4 md:gap-4 mb-4 md:mb-8'>
          {/* Trạng thái */}
          <div className='flex items-center gap-2'>
            <FormField
              control={form.control}
              name='front_status'
              render={({ field }) => (
                <FormItem className='w-full md:w-auto'>
                  <Select
                    onValueChange={field.onChange}
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

            {/* Loại chương trình */}
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem className='w-full md:w-auto'>
                  <Select
                    onValueChange={field.onChange}
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

            {/* Loại đóng góp */}
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='w-full md:w-auto'>
                  <Select
                    onValueChange={field.onChange}
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
                        onChange={field.onChange}
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
  );
};

export default ProjectFilter;
