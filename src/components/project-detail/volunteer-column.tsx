'use client';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const volunteerColumn: ColumnDef<TSVolunteer>[] = [
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
        Người tình nguyện
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className='min-w-[70px] max-w-[300px] w-full'>
        {row.getValue('name')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'project_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column}>
        Chiến dịch tham gia
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className='min-w-[60px] max-w-[300px]'>
        {row.getValue('project_name')}
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
        Thời gian đăng ký
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
