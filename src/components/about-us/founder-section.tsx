import React from 'react';
import Image from 'next/image';

const FounderSection = () => {
  return (
    <section className='w-full bg-gray-50 rounded-2xl p-4 sm:p-8 lg:p-12'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
        {/* Content */}
        <div className='space-y-4 sm:space-y-6 order-2 lg:order-1'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
            Người sáng lập
          </h2>
          <div className='space-y-3 sm:space-y-4 text-gray-600'>
            <p className='text-base sm:text-lg'>
              Với hơn 15 năm kinh nghiệm trong lĩnh vực từ thiện và phát triển
              cộng đồng, người sáng lập của chúng tôi đã dành trọn tâm huyết để
              xây dựng một tổ chức phi lợi nhuận có tầm ảnh hưởng tích cực đến
              xã hội.
            </p>
            <p className='text-base sm:text-lg'>
              Tầm nhìn của người sáng lập là tạo ra một nền tảng kết nối hiệu
              quả giữa những người cần giúp đỡ và những người muốn đóng góp,
              đồng thời đảm bảo tính minh bạch và bền vững trong mọi hoạt động.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className='relative w-full aspect-[4/3] lg:aspect-square rounded-lg overflow-hidden order-1 lg:order-2'>
          <Image src='/loyal.jpg' alt='Founder' fill className='object-cover' />
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
