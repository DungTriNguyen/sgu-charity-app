'use client';
import { useGetSettingPage } from '@/hooks/use-setting';
import { SETTING_TYPE } from '../enum';

const PrivacyTermsPage = () => {
  const { data: terms } = useGetSettingPage({
    key: SETTING_TYPE.TERMS,
  });

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Banner Section */}
      <div className='relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full'>
        <div className='absolute inset-0 bg-terms-banner bg-cover lg:bg-top bg-center'></div>
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4'>
            Điều khoản
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
        <div
          className='custom-content prose prose-sm sm:prose lg:prose-lg max-w-none'
          dangerouslySetInnerHTML={{ __html: terms?.data.value || '' }}
        />
      </div>
    </div>
  );
};

export default PrivacyTermsPage;
