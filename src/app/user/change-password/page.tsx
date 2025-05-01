import UserChangePassword from '@/components/user/UserChangePassword';
import React from 'react';

const ChangePasswordPage = () => {
  return (
    <div className=' flex flex-col mt-4 justify-center items-center gap-8'>
      <h2 className='font-bold text-2xl text-center text-[#1DA1F2] mt-4'>
        Đổi mật khẩu
      </h2>
      <UserChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
