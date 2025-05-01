import React, { useState, useEffect } from 'react';
import AccountItem from './account-item';
import { Button } from '../ui/button';
import { useGetListUserProfileQuery } from '@/hooks/use-profile';

const AccountList = ({ type, search }: { type: string; search: string }) => {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<TUser[]>([]);
  const { data, isLoading } = useGetListUserProfileQuery({
    type,
    search,
    limit: 6,
    page,
  });

  // Reset state when type or search changes
  useEffect(() => {
    setPage(1);
    setAllItems([]);
  }, [type, search]);

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllItems(data.data);
      } else {
        setAllItems((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
        {allItems.map((item: TUser) => (
          <AccountItem key={`${item.id}`} data={item} />
        ))}
      </ul>
      {data?.data?.length === 6 && (
        <div className='flex justify-center pt-8 md:pt-14'>
          <Button
            className='w-full sm:w-auto'
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Đang tải...' : 'Xem thêm'}
          </Button>
        </div>
      )}
    </>
  );
};

export default AccountList;
