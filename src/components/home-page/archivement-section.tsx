import React from 'react';
import { useGetStatisticQuery } from '@/hooks/use-statistic';
import { formatCurrencyToVND } from '@/lib/utils';

const ArchivementSection = () => {
  const { data: statistics } = useGetStatisticQuery();

  const archievements = [
    {
      label: 'Tổ chức',
      value: statistics?.data.organization_count || 0,
      color: '#999EF6',
    },
    {
      label: 'Cá nhân',
      value: statistics?.data.individual_count || 0,
      color: '#17CAD7',
    },
    {
      label: 'Chiến dịch',
      value: statistics?.data.project_count || 0,
      color: '#FF6D6D',
    },
    {
      label: 'Thành viên',
      value: statistics?.data.user_count || 0,
      color: '#0CA55C',
    },
    {
      label: 'Lượt ủng hộ',
      value: statistics?.data.donation_count || 0,
      color: '#FF9D2D',
    },
    {
      label: 'Số tiền (VND)',
      value:
        formatCurrencyToVND(Number(statistics?.data.total_donation_amount)) ||
        0,
      color: '#7AB6FC',
    },
  ];

  return (
    <div className='px-4 py-8'>
      <h3 className='text-3xl font-bold text-center mb-2'>
        Thành quả đạt được
      </h3>
      <p className='text-center mb-6'>
        Kể từ năm 2006, VinaCapital Foundation đã tự hào thay đổi cuộc sống của
        mọi người:
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-4 min-h-[400px]'>
        {/* Ảnh nền: chỉ hiển thị trên màn hình lớn */}
        <div className='hidden lg:block col-span-4 lg:col-span-1 lg:row-span-2 bg-bg-archievement bg-contain bg-no-repeat bg-center w-full h-full'></div>

        {/* Các thành phần thống kê */}
        {archievements.map((item) => (
          <div
            key={item.label}
            className='col-span-1 flex flex-col justify-center items-center max-md:bg-white max-md:rounded-lg max-md:shadow p-4 text-center'
          >
            <div className='flex items-center gap-2 text-lg sm:text-xl'>
              <span
                className='h-4 w-4 rounded-full'
                style={{ background: item.color }}
              />
              <span>{item.label}</span>
            </div>
            <div className='font-bold text-xl lg:text-3xl mt-2'>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivementSection;
