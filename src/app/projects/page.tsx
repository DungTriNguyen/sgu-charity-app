import ProjectComponent from '@/components/project';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { use } from 'react';

const tabList = [
  {
    label: 'Tất cả',
    value: 'all',
    role: null,
  },
  {
    label: 'Tổ chức',
    value: 'organization',
    role: 'tổ chức gây quỹ',
  },
  {
    label: 'Cá nhân',
    value: 'individual',
    role: 'cá nhân gây quỹ',
  },
];

const ProjectPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = use(searchParams);

  // Lấy role từ URL params và decode nếu cần
  const currentRole = params.role
    ? decodeURIComponent(params.role as string)
    : null;

  // Tìm tab hiện tại dựa trên role
  const currentTab =
    tabList.find((tab) => {
      return tab.role === currentRole;
    })?.value || 'all';

  return (
    <div className='container 2xl:max-w-[1200px] mx-auto py-16'>
      <div className='flex justify-center gap-8 mb-10'>
        {tabList.map((tab) => {
          const href = tab.role
            ? `/projects?role=${encodeURIComponent(tab.role)}`
            : '/projects';


          return (
            <Link
              key={tab.value}
              href={href}
              className={cn(
                'text-center font-bold text-2xl transition-colors',
                currentTab === tab.value
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <h3 className='text-center font-bold text-3xl mb-10'>
        Danh sách chương trình gây quỹ
      </h3>

      <ProjectComponent initialRole={currentRole} />
    </div>
  );
};

export default ProjectPage;
