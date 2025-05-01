import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import DonatedTable from './donated-table';
import { donatedColumn } from './donated-column';
import { useDonationQuery } from '@/hooks/use-donation';
import { usePagination } from '@/hooks/use-pagination';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/hooks/use-debounce';

const DonatedList = ({ project }: { project: TCampaign }) => {
  const projectId = project.id;
  const { register, watch } = useForm();
  const searchKeyword = watch('keyword');
  const debouncedSearch = useDebounce(searchKeyword, 300);

  const { currentPage, setCurrentPage, setItemsPerPage } = usePagination({});

  const { data: donationData, isLoading } = useDonationQuery({
    limit: 10,
    page: currentPage,
    projectId,
    keyword: debouncedSearch ? debouncedSearch : null,
  });

  useEffect(() => {
    if (debouncedSearch !== '') {
      setCurrentPage(1);
    }
  }, [debouncedSearch, setCurrentPage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách ủng hộ</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Input
          placeholder='Nhập thông tin tìm kiếm...'
          type='search'
          {...register('keyword')}
        />
        <DonatedTable
          columns={donatedColumn}
          data={donationData?.data || []}
          loading={isLoading}
          page={currentPage || 1}
          total={donationData?.pagination?.total || 0}
          totalPages={donationData?.pagination?.last_page || 1}
          changePage={setCurrentPage}
          changeItemsPerPage={setItemsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default DonatedList;
