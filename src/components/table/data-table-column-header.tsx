import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Column } from '@tanstack/react-table';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  children?: React.ReactNode | string;
  childClassName?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  children,
  className,
  childClassName
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div className={cn('flex items-center', className)}>
      <Button
        variant="link"
        className={cn(
          `w-full text-muted-foreground hover:decoration-inherit flex items-center gap-2 p-0`,
          childClassName
        )}
        onClick={column.getToggleSortingHandler()}
      >
        {children}
        <div>
          <ChevronUpIcon
            viewBox="4 4 16 16"
            width={10}
            height={10}
            fill="currentColor"
            className={cn('opacity-30', {
              'opacity-100': column.getIsSorted() === 'asc'
            })}
          />
          <ChevronDownIcon
            viewBox="4 12 16 4"
            width={10}
            height={10}
            fill="currentColor"
            className={cn('opacity-30', {
              'opacity-100': column.getIsSorted() === 'desc'
            })}
          />
        </div>
        {/* {{
          asc: <MoveUpIcon width={16} height={16} />,
          desc: <MoveDownIcon width={16} height={16} />
        }[column.getIsSorted() as string] ?? null} */}
      </Button>
    </div>
  );
}
