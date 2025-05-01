'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { formatCurrencyToVND } from '@/lib/utils';
import { format } from 'date-fns';

export const donatedColumn: ColumnDef<TDonatedData>[] = [
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
    accessorKey: 'project_name',
    header: 'Tên Chiến dịch',
    cell: ({ row }) => {
      const project = row.original.project;
      return <div>{project?.name || 'Không có tên chiến dịch'}</div>;
    },
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

export const statisticColumn: ColumnDef<TDonatedData>[] = [
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
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className='min-w-[100px] max-w-[100px] text-left'
      >
        T/g ủng hộ
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className='min-w-[100px] max-w-[100px] text-left'>
        {format(row.getValue('created_at'), 'dd/MM/yyyy HH:mm:ss')}
      </div>
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
    accessorKey: 'project_name',
    header: 'Tên Chiến dịch',
    cell: ({ row }) => {
      const project = row.original.project;
      return <div>{project?.name || 'Không có tên chiến dịch'}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'payment_method_code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>
        Phương thức thanh toán
      </DataTableColumnHeader>
    ),
    cell: ({ renderValue }) => (
      <div className='min-w-[70px] max-w-[100px] w-full'>
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
    accessorKey: 'status_label',
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>Trạng thái</DataTableColumnHeader>
    ),
    cell: ({ renderValue }) => (
      <div className='min-w-[60px] max-w-[300px]'>
        {renderValue() as string}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
