import EditProfileForm from '@/components/user/edit-profile-form';
import React from 'react';

const EditProfilePage = () => {
  return (
    <div className='mt-4 container mx-auto flex flex-col gap-8 px-2 md:px-4'>
      <h2 className='font-bold text-center mt-4 text-primary text-xl md:text-2xl'>
        Chỉnh sửa thông tin cá nhân
      </h2>
      <EditProfileForm />
    </div>
  );
};

export default EditProfilePage;
