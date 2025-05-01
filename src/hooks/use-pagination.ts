'use client';
// import { ITEM_PER_PAGES } from '@/app/constants';
import { useState } from 'react';

const usePagination = ({ page }: { page?: number }) => {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [itemsPerPage, setItemsPerPage] = useState<string>('10');

  // useEffect(() => {
  //   // reset page index when change items per page
  //   if (currentPage !== 1) {
  //     setCurrentPage(1);
  //   }
  // }, [currentPage]);

  return { currentPage, itemsPerPage, setItemsPerPage, setCurrentPage };
};

export { usePagination };
