import React from 'react';

const CreateAccountLayout = ({ children }: { children: React.ReactNode }) => {
  const title = 'Mở tài khoản ';
  return (
    <>
      <div className='bg-contact-banner h-[200px] md:h-[250px] lg:h-[350px] lg:bg-top bg-center w-full bg-cover flex items-center justify-center text-white text-3xl md:text-4xl lg:text-6xl font-bold relative'>
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-35'></div>
        <div className='absolute text-center px-4'>{title}</div>
      </div>
      {children}
    </>
  );
};

export default CreateAccountLayout;
