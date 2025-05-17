'use client';
import RegisterVolunteerForm from '@/components/project-detail/register-volunteer-form';
import ProjectItem from '@/components/project/project-item';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetProjectByID } from '@/hooks/use-project';
import Image from 'next/image';
import { use } from 'react';

const RegisterVolunteer = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const { id } = params;
  const { data: projectById } = useGetProjectByID({ slug: id });
  const project = projectById?.data?.[0];

  return (
    <div className='container 2xl:max-w-[1200px] mx-auto my-4 md:my-8 px-4 md:px-6 lg:px-8'>
      <div className='flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8'>
        <div className='w-full lg:w-2/5'>
          <Card className='flex flex-col'>
            <div className='flex gap-2 items-center p-3 md:p-4'>
              <Image
                alt='avatar'
                width={40}
                height={40}
                src={project?.user?.avatar_url || '/avatar.png'}
                className='rounded-full aspect-square w-10 h-10 md:w-12 md:h-12'
              />
              <div className=''>
                <p className='text-sm md:text-base'>
                  Tình nguyện cho chương trình của tổ chức/ cá nhân:
                </p>
                <p className='text-primary text-lg md:text-xl'>
                  {project?.user?.name}
                </p>
              </div>
            </div>
            <Separator />
            <div className='p-3 md:p-4'>
              {project && <ProjectItem project={project} />}
            </div>
          </Card>
        </div>
        <div className='w-full lg:w-3/5'>
          {project?.id && <RegisterVolunteerForm projectId={project?.id} />}
        </div>
      </div>
    </div>
  );
};

export default RegisterVolunteer;
