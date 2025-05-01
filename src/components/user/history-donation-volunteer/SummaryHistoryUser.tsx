'use client';
import { useGetUserProfileQuery } from '@/hooks/use-profile';
import { formatCurrencyToVND } from '@/lib/utils';
import {
  CircleDollarSignIcon,
  HandHeartIcon,
  HeartHandshakeIcon,
} from 'lucide-react';

const SummaryHistoryUser = () => {
  const { data: userProfile } = useGetUserProfileQuery();
  return (
    <div className='w-full max-w-7xl mx-auto my-6 px-2 md:px-0'>
      <div className='w-full bg-[#0089dfcc] rounded-2xl backdrop-blur-[2px] backdrop-brightness-[100%] p-4 md:p-6 space-y-4'>
        <div className='w-full bg-white rounded-[14px] p-4 flex items-center '>
          <div className='w-12 h-12 flex-shrink-0'>
            <CircleDollarSignIcon
              color='#00a7ef'
              className='w-full h-full object-contain '
            />
          </div>
          <div className='ml-4'>
            <div className='text-[#00a7ef] text-2xl md:text-3xl font-bold'>
              {formatCurrencyToVND(
                Number(userProfile?.data.donations_with_paid_sum_amount)
              ) || '0 vnđ'}
            </div>
            <p className='text-[#8d8d8d] text-sm'>
              Tổng số tiền đã ủng hộ thành công
            </p>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='w-full lg:w-[50%] '>
            <div className='w-full bg-white rounded-[14px] p-4 flex items-center'>
              <div className='w-12 h-12 flex-shrink-0'>
                <HandHeartIcon
                  color='#00a7ef'
                  className='w-full h-full object-contain '
                />
              </div>
              <div className='ml-4'>
                <div className='text-[#00a7ef] text-2xl md:text-3xl font-bold'>
                  {userProfile?.data.donations_with_paid_count || 0}
                </div>
                <p className='text-[#8d8d8d] text-sm'>
                  Tổng số lươt ủng hộ thành công
                </p>
              </div>
            </div>
          </div>

          <div className='w-full lg:w-[50%]'>
            <div className='w-full bg-white rounded-[14px] p-4 flex items-center'>
              <div className='w-12 h-12 flex-shrink-0'>
                <HeartHandshakeIcon
                  color='#00a7ef'
                  className='w-full h-full object-contain '
                />
              </div>
              <div className='ml-4'>
                <div className='text-[#00a7ef] text-2xl md:text-3xl font-bold'>
                  {userProfile?.data.volunteers_without_canceled_count || 0}
                </div>
                <p className='text-[#8d8d8d] text-sm'>
                  Tổng số lượt tham gia tình nguyện
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryHistoryUser;
