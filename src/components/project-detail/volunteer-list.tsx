import { useDebounce } from '@/hooks/use-debounce';
import { usePagination } from '@/hooks/use-pagination';
import { useVolunteerQuery } from '@/hooks/use-volunteer';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { volunteerColumn } from './volunteer-column';
import VolunteerTable from './volunteer-table';

const VolunteerList = ({ project }: { project: TCampaign }) => {
  const { register, watch } = useForm();
  const searchKeyword = watch('keyword');
  const debouncedSearch = useDebounce(searchKeyword, 300);
  const projectId = project?.id;

  const { currentPage, setCurrentPage, setItemsPerPage } = usePagination({});

  const { data: volunteerData, isLoading } = useVolunteerQuery({
    limit: 10,
    page: 1,
    projectId,
    keyword: debouncedSearch ? debouncedSearch : null,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách Tham gia TNV</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Input
          placeholder='Nhập thông tin tìm kiếm...'
          type='search'
          {...register('keyword')}
        />
        <VolunteerTable
          columns={volunteerColumn}
          data={volunteerData?.data || []}
          loading={isLoading}
          page={currentPage || 1}
          total={volunteerData?.pagination?.total || 0}
          totalPages={volunteerData?.pagination?.last_page || 1}
          changePage={setCurrentPage}
          changeItemsPerPage={setItemsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default VolunteerList;
