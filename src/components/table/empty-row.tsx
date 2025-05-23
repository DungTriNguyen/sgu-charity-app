import { TableCell, TableRow } from '../ui/table';

interface IEmptyRow {
  columnsNumber: number;
}
const EmptyRow = ({ columnsNumber }: IEmptyRow) => {
  return (
    <TableRow className='group-[.content-table]:hover:bg-transparent'>
      <TableCell colSpan={columnsNumber} className='h-24 text-center'>
        Không có kết quả.
      </TableCell>
    </TableRow>
  );
};

export default EmptyRow;
