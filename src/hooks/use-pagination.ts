'use client';
import { useState } from 'react';

const usePagination = ({ page }: { page?: number }) => {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [itemsPerPage, setItemsPerPage] = useState<string>('3');
  return { currentPage, itemsPerPage, setItemsPerPage, setCurrentPage };
};

export { usePagination };
