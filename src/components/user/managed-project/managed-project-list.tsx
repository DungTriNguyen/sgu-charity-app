import { Card } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import ManagedProjectItem from './managed-project-item';
import { useGetProjectQuery } from '@/hooks/use-project';
import { Button } from '@/components/ui/button';

const ManagedProjectList = ({ userId }: { userId: number }) => {
  const [page, setPage] = useState(1);
  const [allProjects, setAllProjects] = useState<TCampaign[]>([]);
  const limit = 3;

  const { data: projectData, isLoading } = useGetProjectQuery({
    user_id: userId,
    limit,
    page,
  });

  // Cập nhật danh sách projects khi có dữ liệu mới
  useEffect(() => {
    if (projectData?.data) {
      if (page === 1) {
        setAllProjects(projectData.data);
      } else {
        setAllProjects((prev) => [...prev, ...projectData.data]);
      }
    }
  }, [projectData?.data, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Kiểm tra xem còn dữ liệu để load không
  const hasMore = projectData?.data?.length === limit;

  if (isLoading && page === 1) {
    return (
      <Card className='p-4 flex flex-col gap-4'>
        <div className='text-center'>Đang tải...</div>
      </Card>
    );
  }

  if (allProjects.length === 0) {
    return (
      <Card className='p-4 flex flex-col gap-4'>
        <div className='text-center'>Không có dự án nào</div>
      </Card>
    );
  }

  return (
    <Card className='p-4 flex flex-col gap-4'>
      {allProjects.map((item: TCampaign) => (
        <a href={`/projects/${item.slug}`} key={item.id}>
          <ManagedProjectItem project={item} />
        </a>
      ))}

      {hasMore && (
        <div className='flex justify-center pt-4'>
          <Button
            className='w-full sm:w-auto'
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Đang tải...' : 'Xem thêm'}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ManagedProjectList;
