import React from 'react';

import { useVolunteerQuery } from '@/hooks/use-volunteer';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/hooks/use-debounce';
import { usePagination } from '@/hooks/use-pagination';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import VolunteerTable from '@/components/project-detail/volunteer-table';
import { volunteerColumn } from '@/components/project-detail/volunteer-column';

const OwndedParticipantList = ({
  project,
  userId,
  keyParam = 'user_id',
}: {
  project?: TCampaign;
  userId: number;
  keyParam?: 'user_id' | 'projects_belong_to_user_id';
}) => {
  const { register, watch } = useForm();
  const searchKeyword = watch('keyword');
  const debouncedSearch = useDebounce(searchKeyword, 300);
  const projectId = project?.id;

  const { currentPage, setCurrentPage, setItemsPerPage } = usePagination({});

  const { data: volunteerData, isLoading } = useVolunteerQuery({
    limit: 10,
    page: 1,
    projectId: projectId || null,
    keyword: debouncedSearch ? debouncedSearch : null,
    [keyParam]: userId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách Tham gia TNV</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Input
          placeholder='Nhập thông tin tìm kiếm...'
          type='search'
          {...register('keyword')}
        />
        <VolunteerTable
          profile={true}
          columns={volunteerColumn}
          data={volunteerData?.data || []}
          loading={isLoading}
          page={currentPage || 1}
          total={volunteerData?.pagination?.total || 0}
          totalPages={volunteerData?.pagination?.last_page || 1}
          changePage={setCurrentPage}
          changeItemsPerPage={setItemsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default OwndedParticipantList;
