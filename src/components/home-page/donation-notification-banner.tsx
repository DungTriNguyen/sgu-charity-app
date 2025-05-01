'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useDonationQuery } from '@/hooks/use-donation';
import Image from 'next/image';
import { formatCurrencyToVND } from '@/lib/utils';

const DonationNotificationBanner: React.FC = () => {
  const {
    data: donations,
    isLoading,
    error,
  } = useDonationQuery({
    page: 1,
    limit: 5,
  });
  console.log('donationList:', donations);

  const [notifications, setNotifications] = useState<TSDonationData[]>([]);

  const getTimeDifference = (targetDate: string) => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();

    // Get difference in milliseconds
    const diffMs = now - target;

    // Convert to different units
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    // Return appropriate string based on the largest applicable unit
    if (diffYears >= 1) {
      return `${diffYears} năm trước`;
    } else if (diffMonths >= 1) {
      return `${diffMonths} tháng trước`;
    } else if (diffDays >= 1) {
      return `${diffDays} ngày trước`;
    } else if (diffHours >= 1) {
      return `${diffHours} giờ trước`;
    } else if (diffMinutes >= 1) {
      return `${diffMinutes} phút trước`;
    } else {
      return `${diffSeconds} giây trước`;
    }
  };

  useEffect(() => {
    if (donations && Array.isArray(donations.data)) {
      setNotifications(donations.data); // Chỉ set nếu donations.data là mảng
    }
  }, [donations]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching donations: {error.message}</div>;
  }

  return (
    <div className='w-full '>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#00A7EF',
            '--swiper-pagination-bottom': '0',
            // 'swiper-navigation-disabled': true,
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={24}
        navigation={false}
        slidesPerView={1}
        modules={[Autoplay]}
        className='mySwiper2 h-20'
        pagination={{
          clickable: false,
        }}
        direction={'vertical'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        simulateTouch={false}
      >
        {notifications.map((item: TSDonationData) => (
          <SwiperSlide
            key={item.id}
            className='rounded-lg overflow-hidden h-full flex items-center'
          >
            <div className='flex gap-4 p-2 pl-2 lg:pt-1 items-center'>
              <div className='h-12 w-12 rounded-full'>
                <Image
                  src={item?.user?.avatar_url}
                  alt='avatar'
                  width={100}
                  height={100}
                  className='rounded-full w-12 h-12'
                />
              </div>
              <div>
                <p className='line-clamp-1'>
                  <span className='font-bold'>{item?.name}</span>
                  <span> vừa ủng hộ </span>
                  <span className='text-[#1DA1F2] font-bold'>
                    {item?.project?.name}
                  </span>
                </p>

                <p className='italic text-[#1DA1F2]'>
                  <span className='text-black'>số tiền: </span>
                  {formatCurrencyToVND(Number(item?.amount)) || 0}
                </p>
                <p className='italic'>{getTimeDifference(item.created_at)}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DonationNotificationBanner;
