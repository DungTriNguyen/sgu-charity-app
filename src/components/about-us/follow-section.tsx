import Image from 'next/image';
import React from 'react';
import peopleImg from '../../../public/people-img.png';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const FollowSection = () => {
  return (
    <div className='bg-nature-banner rounded-2xl bg-cover bg-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] py-8 sm:py-12 lg:py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
        <div className='py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-16'>
          <p className='font-bold text-2xl sm:text-3xl lg:text-4xl text-black'>
            Theo giỏi bản tin của chúng tôi để nhận những thông báo mới nhất
          </p>
          <form className='flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8'>
            <Label>Họ tên</Label>
            <Input
              placeholder='Họ tên'
              className='bg-white/90 backdrop-blur-sm'
            />
            <Label>Email</Label>
            <Input
              placeholder='Email'
              className='bg-white/90 backdrop-blur-sm'
            />
            <div className='flex justify-end mt-2'>
              <Button
                type='submit'
                disabled
                className='bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90'
              >
                Đăng ký ngay
              </Button>
            </div>
          </form>
          <p className='mt-8 sm:mt-12 lg:mt-16 text-white/70 text-xs sm:text-sm'>
            Xem Chính sách bảo mật để biết chúng tôi sử dụng và giữ thông tin cá
            nhân của bạn một cách an toàn như thế nào.
          </p>
        </div>
        <div className='hidden lg:block relative w-full h-[400px] lg:h-[500px]'>
          <Image
            src={peopleImg.src}
            alt='news'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default FollowSection;
