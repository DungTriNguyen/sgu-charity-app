'use client';
import { CAMPAIGN_STATUS, CAMPAIGN_TYPE } from '@/app/enum';
import { useGetProjectQuery } from '@/hooks/use-project';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '.';
import { Button } from '../ui/button';
import ProjectItem from './project-item';
import { Suspense, useEffect, useState } from 'react';

interface ProjectListProps {
  initialRole: string | null;
}

const ProjectList = ({ initialRole }: ProjectListProps) => {
  const [page, setPage] = useState(1);
  const [allProjects, setAllProjects] = useState<TCampaign[]>([]);
  const form = useFormContext<z.infer<typeof formSchema>>();
  const { data: projectData, isLoading } = useGetProjectQuery({
    role: initialRole,
    keyword: form.watch('keyword'),
    front_status: form.watch('front_status'),
    type: form.watch('type') as CAMPAIGN_TYPE,
    category: form.watch('category'),
    page: page,
    limit: page === 1 ? 9 : 6,
  });

  useEffect(() => {
    setPage(1);
    setAllProjects([]);
  }, [
    form.watch('keyword'),
    form.watch('front_status'),
    form.watch('type'),
    form.watch('category'),
    initialRole,
  ]);
  useEffect(() => {
    if (projectData?.data) {
      if (page === 1) {
        setAllProjects(projectData.data);
      } else {
        setAllProjects((prev) => {
          const newItems = projectData.data.filter(
            (newItem) =>
              !prev.some((existingItem) => existingItem.id === newItem.id)
          );
          return [...prev, ...newItems];
        });
      }
    }
  }, [projectData?.data, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMore = projectData?.data?.length === (page === 1 ? 9 : 6);

  return (
    <div className='mt-4 md:mt-8'>
      <Suspense
        fallback={
          <div className='text-center py-10'>
            Đang tải thông tin chương trình...
          </div>
        }
      >
        {allProjects.length > 0 ? (
          <>
            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
              {allProjects.map((item: TCampaign) => (
                <ProjectItem
                  key={`${item.id}-${item.slug}-${page}`}
                  project={item}
                />
              ))}
            </ul>

            {hasMore && (
              <div className='flex justify-center pt-8 md:pt-14'>
                <Button
                  className='w-full sm:w-auto min-w-[120px]'
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang tải...' : 'Xem thêm'}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className='text-center py-10'>
            Không tìm thấy chương trình nào
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ProjectList;
