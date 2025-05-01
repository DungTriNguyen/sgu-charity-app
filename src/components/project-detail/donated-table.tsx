'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import EmptyRow from '../table/empty-row';
import { Skeleton } from '../ui/skeleton';
import { DataTablePagination } from '../table/data-table-pagination';

interface IDonatedList {
  data: TSDonationData[];
  columns: ColumnDef<TSDonationData>[];
  loading: boolean;
  page: number;
  total: number;
  totalPages: number;
  changePage: React.Dispatch<React.SetStateAction<number>>;
  changeItemsPerPage: React.Dispatch<React.SetStateAction<string>>;
}
const DonatedTable = (props: IDonatedList) => {
  const {
    data,
    columns,
    loading = false,
    page,
    total,
    totalPages,
    changePage,
    changeItemsPerPage,
  } = props;

  const tableData = React.useMemo(
    () => (loading ? Array(5).fill({}) : data),
    [loading, data]
  );
  const tableColumns = React.useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className='h-[14px] w-[60%] rounded-sm' />,
          }))
        : columns,
    [loading, columns]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    state: {
      columnVisibility: {
        id: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    getRowId: (row) => row.id,
  });

  return (
    <div className='space-y-4'>
      {/* <DataTableToolbar table={table} /> */}
      <div className='rounded-md border'>
        <Table className='min-w-[650px] overflow-auto'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <EmptyRow columnsNumber={columns.length} />
            )}
          </TableBody>
        </Table>
      </div>
      {!loading && (
        <DataTablePagination
          currentPage={page}
          totalPages={totalPages}
          total={total}
          changePage={changePage}
          changeItemsPerPage={changeItemsPerPage}
        />
      )}
    </div>
  );
};

export default DonatedTable;
