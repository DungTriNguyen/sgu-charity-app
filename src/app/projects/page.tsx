import ProjectComponent from '@/components/project';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { use } from 'react';

const tabList = [
  {
    label: 'Tất cả',
    value: 'all',
  },
  {
    label: 'Tổ chức',
    value: 'organization',
  },
  {
    label: 'Cá nhân',
    value: 'individual',
  },
];

const ProjectPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const currentFilter = use(searchParams).filter || 'all';

  return (
    <div className='container 2xl:max-w-[1200px] mx-auto py-16'>
      <div className='flex justify-center gap-8 mb-10'>
        {tabList.map((tab) => (
          <Link
            key={tab.value}
            href={`/projects?filter=${tab.value}`}
            className={cn(
              'text-center font-bold text-2xl transition-colors',
              currentFilter === tab.value
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <h3 className='text-center font-bold text-3xl mb-10'>
        Danh sách chiến dịch gây quỹ
      </h3>

      <ProjectComponent />
    </div>
  );
};

export default ProjectPage;
