'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { formatCurrencyToVND } from '@/lib/utils';
import { format } from 'date-fns';

export const donatedColumn: ColumnDef<TSDonationData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>STT</DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <div>{row.getValue('status') === 1 ? row.index + 1 : ''}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>
        Người ủng hộ
      </DataTableColumnHeader>
    ),
    cell: ({ renderValue }) => (
      <div className='min-w-[70px] max-w-[300px] w-full'>
        {renderValue() as string}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>
        Số tiền ủng hộ
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className='min-w-[60px] max-w-[300px]'>
        {formatCurrencyToVND(Number(row.getValue('amount')))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className='min-w-[200px] max-w-[300px] text-center'
      >
        Thời gian ủng hộ
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className='min-w-[200px] max-w-[300px] text-center'>
        {format(row.getValue('created_at'), 'dd/MM/yyyy HH:mm:ss')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
