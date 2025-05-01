'use client';
import { CAMPAIGN_STATUS, CAMPAIGN_TYPE } from '@/app/enum';
import { useGetProjectQuery } from '@/hooks/use-project';
import { getCampaignRole } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '.';
import { Button } from '../ui/button';
import ProjectItem from './project-item';

const ProjectList = () => {
  const form = useFormContext<z.infer<typeof formSchema>>();
  const searchParam = useSearchParams();

  const { data } = useGetProjectQuery({
    role: getCampaignRole(searchParam?.get('filter') as string),
    keyword: form.watch('keyword'),
    front_status: form.watch('front_status') as CAMPAIGN_STATUS,
    type: form.watch('type') as CAMPAIGN_TYPE,
    category: form.watch('category'),
    // page: 1,
    // limit: 6,
  });

  return (
    <div className='mt-4 md:mt-8'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
        {data?.data?.map((item: TCampaign) => {
          return <ProjectItem key={item.id} project={item} />;
        })}
      </ul>

      <div className='flex justify-center pt-8 md:pt-14'>
        <Button className='w-full sm:w-auto'>Xem thêm</Button>
      </div>
    </div>
  );
};

export default ProjectList;
