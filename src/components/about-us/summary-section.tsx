import React from 'react';
import Image from 'next/image';

const SummarySection = () => {
  return (
    <section className='w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-4'>
        {/* Image */}
        <div className='relative w-full aspect-[4/3] lg:aspect-auto lg:h-[400px] rounded-lg overflow-hidden'>
          <Image
            src='/community.jpg'
            alt='About Us Summary'
            fill
            className='object-cover rounded-2xl '
            priority
          />
        </div>

        {/* Content */}
        <div className='space-y-4 sm:space-y-6'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
            Tổng quan về chúng tôi
          </h2>
          <div className='space-y-3 sm:space-y-4 text-gray-600'>
            <p className='text-base sm:text-lg'>
              Chúng tôi là một tổ chức phi lợi nhuận với sứ mệnh mang lại những
              thay đổi tích cực cho cộng đồng thông qua các hoạt động từ thiện
              và tình nguyện.
            </p>
            <p className='text-base sm:text-lg'>
              Với hơn 10 năm kinh nghiệm, chúng tôi đã thực hiện nhiều dự án ý
              nghĩa, hỗ trợ hàng nghìn người có hoàn cảnh khó khăn và tạo cơ hội
              cho các tình nguyện viên đóng góp vào sự phát triển của xã hội.
            </p>
            <p className='text-base sm:text-lg'>
              Chúng tôi tin rằng mỗi hành động nhỏ đều có thể tạo nên sự thay
              đổi lớn, và cùng nhau, chúng ta có thể xây dựng một thế giới tốt
              đẹp hơn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
