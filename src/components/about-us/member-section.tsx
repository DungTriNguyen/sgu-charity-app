import React from 'react';
import Image from 'next/image';

const members = [
  {
    name: 'Nguyễn Văn A',
    role: 'Chủ tịch',
    image: '/logo.png',
  },
  {
    name: 'Trần Thị B',
    role: 'Phó Chủ tịch',
    image: '/logo.png',
  },
  {
    name: 'Lê Văn C',
    role: 'Thư ký',
    image: '/logo.png',
  },
  {
    name: 'Phạm Thị D',
    role: 'Treasurer',
    image: '/logo.png',
  },
];

const MemberSection = () => {
  return (
    <section className='w-full p-4'>
      <div className='text-center mb-8 sm:mb-12'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
          Ban điều hành
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Đội ngũ lãnh đạo giàu kinh nghiệm và tâm huyết với sứ mệnh của tổ chức
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
        {members.map((member, index) => (
          <div
            key={index}
            className='group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='relative aspect-square'>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className='object-cover'
              />
            </div>
            <div className='p-4 sm:p-6'>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-900'>
                {member.name}
              </h3>
              <p className='text-gray-600'>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemberSection;
