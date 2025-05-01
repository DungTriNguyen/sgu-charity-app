import { USER_ROLES } from '@/app/enum';
import { formatCurrencyToVND } from '@/lib/utils';
import { Card } from '../ui/card';

const SummaryInfo = ({ summaryInfo }: { summaryInfo: TUser }) => {
  const {
    // user
    donations_with_paid_count,
    donations_with_paid_sum_amount,
    volunteers_without_canceled_count,
    // individual and organization and admin
    projects_count,
    projects_donations_sum_amount,
    projects_donations_count,
    projects_volunteers_count,
    type,
  } = summaryInfo;

  return (
    <>
      {(type === USER_ROLES.ADMIN ||
        type === USER_ROLES.INDIVIDUAL ||
        type === USER_ROLES.ORIGANIZATION) && (
        <Card className='p-4 grid grid-cols-2 gap-4 bg-[#f9f9f9] border-none'>
          <div className='bg-primary col-span-2 min-h-[200px] rounded-lg text-white p-4 flex flex-col justify-between font-bold '>
            <div className='opacity-0'> a</div>
            <p className='text-center text-2xl'>
              {formatCurrencyToVND(projects_donations_sum_amount || 0)}
            </p>
            <div className='text-lg'>Số tiền ủng hộ</div>
          </div>
          <div className='bg-primary col-span-2 min-h-[100px] rounded-lg text-white p-4 flex flex-col justify-between font-bold '>
            <div className='opacity-0'> a</div>
            <p className='text-center text-2xl'>{projects_count || 0}</p>
            <div className='text-lg'>Số dự án đã tạo</div>
          </div>
          <div className='col-span-1 min-h-[160px] bg-white shadow rounded-lg p-4 flex flex-col justify-between '>
            <div className='opacity-0'> a</div>
            <p className='text-center text-2xl font-bold'>
              {projects_donations_count || 0}
            </p>
            <div className='text-base'>Số lượt ủng hộ</div>
          </div>
          <div className='col-span-1 min-h-[160px] bg-white shadow rounded-lg p-4 flex flex-col justify-between'>
            <div className='opacity-0'> a</div>
            <p className='text-center text-2xl font-bold'>
              {projects_volunteers_count || 0}
            </p>
            <div className='text-base'>Số lượt tham gia</div>
          </div>
        </Card>
      )}

      {type === USER_ROLES.USER && (
        <Card className='p-4 grid grid-cols-2 gap-4 bg-[#f9f9f9] border-none'>
          <div className='bg-primary col-span-2 min-h-[200px] rounded-lg text-white p-4 flex flex-col justify-between font-bold '>
            <div className='opacity-0'> a</div>
            <p className='text-center text-2xl'>
              {formatCurrencyToVND(donations_with_paid_sum_amount || 0)}
            </p>
            <div className='text-lg'>Số tiền ủng hộ</div>
          </div>
          <div className='col-span-1 min-h-[160px] bg-white shadow rounded-lg p-4 flex flex-col justify-between '>
            <div className='opacity-0'> a</div>
            <p className='text-center text-2xl font-bold'>
              {donations_with_paid_count || 0}
            </p>
            <div className='text-base'>Số lượt ủng hộ</div>
          </div>
          <div className='col-span-1 min-h-[160px] bg-white shadow rounded-lg p-4 flex flex-col justify-between'>
            <div className='opacity-0'> a</div>
            <p className='text-center text-2xl font-bold'>
              {volunteers_without_canceled_count || 0}
            </p>
            <div className='text-base'>Số lượt tham gia</div>
          </div>
        </Card>
      )}
    </>
  );
};

export default SummaryInfo;
