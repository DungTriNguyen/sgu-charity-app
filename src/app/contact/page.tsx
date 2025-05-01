import ContactForm from '@/components/contact/contact-form';
import OfficeInfo from '@/components/contact/office-info';
import React from 'react';

const ContactPage = () => {
  return (
    <>
      <div className='bg-contact-banner bg-cover lg:bg-top bg-center h-[200px] md:h-[250px] lg:h-[350px] w-full flex items-center justify-center text-white text-3xl md:text-4xl lg:text-6xl font-bold relative'>
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-35'></div>
        <div className='absolute text-center px-4'>
          LIÊN HỆ GÓP Ý - PHẢN HỒI
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 container 2xl:max-w-[1200px] mx-auto my-4 md:my-6 lg:my-8 px-4 md:px-6 lg:px-8'>
        <OfficeInfo />
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;
