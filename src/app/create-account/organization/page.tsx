import OrganizationForm from '@/components/register/oranization-form';
import React from 'react';

const CreateOrganizationAccount = () => {
  return (
    <div className='container mx-auto my-8'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-2xl font-bold text-primary max-md:text-center transition-colors duration-300'>
          Thông tin yêu cầu để mở tài khoản tổ chức
        </h1>
        <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
          <OrganizationForm />
        </div>
      </div>
    </div>
  );
};

export default CreateOrganizationAccount;
