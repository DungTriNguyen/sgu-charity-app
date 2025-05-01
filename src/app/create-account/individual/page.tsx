import React from 'react';
import IndividualForm from '@/components/register/individual-form';

const CreateIndividualAccount = () => {
  return (
    // <div className='bg-[url("/individual_bg.jpg")] bg-cover bg-center relative filter brightness-75 rounded'>
    <div className='container mx-auto my-8'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-2xl font-bold text-primary max-md:text-center transition-colors duration-300'>
          Thông tin yêu cầu để mở tài khoản cá nhân
        </h1>
        {/* <div className='bg-[url("/individual_bg.jpg")] bg-cover bg-center relative filter brightness-75 rounded shadow-md hover:shadow-lg transition-all duration-300'>
          <div className='absolute inset-0 bg-black/50'></div> */}
        <div className='relative z-10 p-8 text-black'>
          <IndividualForm />
        </div>
        {/* </div>
      </div> */}
      </div>
    </div>
  );
};

export default CreateIndividualAccount;
