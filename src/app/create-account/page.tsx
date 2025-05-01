'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import React from 'react';

const RegisterPage = () => {
  const router = useRouter();
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 container 2xl:max-w-[1200px] mx-auto my-8 '>
        <Button
          className='text-xl py-6 m-2'
          onClick={() => router.push('/create-account/individual')}
        >
          Đăng ký tài khoản cá nhân
        </Button>
        <Button
          className='text-xl py-6 m-2'
          onClick={() => router.push('/create-account/organization')}
        >
          Đăng ký tài khoản tổ chức
        </Button>
      </div>
    </>
  );
};

export default RegisterPage;
