import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface DataTablePaginationProps {
  currentPage: number;
  total: number;
  totalPages: number;
  changePage: React.Dispatch<React.SetStateAction<number>>;
  changeItemsPerPage: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTablePagination({
  currentPage,
  total,
  totalPages,
  changePage,
}: DataTablePaginationProps) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className='flex items-center justify-end text-center text-sm'>
      <div className={cn(!total ? 'invisible' : 'flex items-center gap-2')}>
        <Button
          variant={'outline'}
          className={cn('px-2', {
            invisible: currentPage === 1,
          })}
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={cn('text-lg', {
              'underline font-bold text-primary': currentPage === page,
            })}
          >
            {page}
          </button>
        ))}
        <Button
          variant={'outline'}
          className={cn('px-2', {
            invisible: currentPage === totalPages,
          })}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
