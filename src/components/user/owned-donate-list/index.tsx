'use client';
import React from 'react';
import OwnedDonateTable from './owned-donate-table';
import { donatedColumn, statisticColumn } from './owned-donate-column';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDonationQuery } from '@/hooks/use-donation';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/hooks/use-debounce';
import { usePagination } from '@/hooks/use-pagination';
// const userId = 7;
const OwnedDonateList = ({
  type = 'donate',
  userId,
  // projects_belong_to_user_id,
  keyParam = 'user_id',
}: {
  type: 'donate' | 'receive';
  userId: number;
  // projects_belong_to_user_id?: number;
  keyParam?: 'user_id' | 'projects_belong_to_user_id';
}) => {
  const { register, watch } = useForm();
  const searchKeyword = watch('keyword');
  const debouncedSearch = useDebounce(searchKeyword, 300);
  const { currentPage, setCurrentPage, setItemsPerPage } = usePagination({});

  const { data: donations } = useDonationQuery({
    // user_id: userId || undefined,
    limit: 10,
    page: currentPage || 1,
    keyword: debouncedSearch ? debouncedSearch : null,
    // projects_belong_to_user_id: projects_belong_to_user_id,
    [keyParam]: userId,
  });
  return (
    <Card className='p-4 flex flex-col gap-4'>
      <Input
        placeholder='Nhập thông tin tìm kiếm...'
        type='search'
        {...register('keyword')}
      />
      <OwnedDonateTable
        columns={type === 'donate' ? donatedColumn : statisticColumn}
        data={donations?.data || []}
        loading={false}
        page={currentPage || 1}
        total={donations?.pagination?.total || 0}
        totalPages={donations?.pagination?.last_page || 1}
        changePage={setCurrentPage}
        changeItemsPerPage={setItemsPerPage}
      />
    </Card>
  );
};

export default OwnedDonateList;
