import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const features = [
  {
    title: 'Tính minh bạch',
    description:
      'Cam kết công khai, minh bạch trong mọi hoạt động và sử dụng nguồn lực.',
  },
  {
    title: 'Hiệu quả',
    description:
      'Tối ưu hóa quy trình để đảm bảo hỗ trợ đến đúng đối tượng cần giúp đỡ.',
  },
  {
    title: 'Bền vững',
    description:
      'Xây dựng các chương trình có tính bền vững và có thể nhân rộng.',
  },
  {
    title: 'Đổi mới',
    description:
      'Liên tục cải tiến và áp dụng công nghệ để nâng cao hiệu quả hoạt động.',
  },
];

const MoreDetailSection = () => {
  return (
    <section className='w-full p-4'>
      <div className='text-center mb-8 sm:mb-12'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
          Giá trị cốt lõi
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Những nguyên tắc và giá trị định hướng cho mọi hoạt động của chúng tôi
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='bg-white sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='flex items-start gap-4'>
              <CheckCircle2 className='w-6 h-6 text-primary flex-shrink-0 mt-1' />
              <div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreDetailSection;
