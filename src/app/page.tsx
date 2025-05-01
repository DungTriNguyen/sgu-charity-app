'use client';

import ArchivementSection from '@/components/home-page/archivement-section';
import MissionSection from '@/components/home-page/mission-section';
import PartnerSection from '@/components/home-page/partner-section';
import SocialInfoSection from '@/components/home-page/social-info-section';
import { Separator } from '@/components/ui/separator';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
import DonationNotificationBanner from '@/components/home-page/donation-notification-banner';

// phần em chỉnh
import CategoriesProjectsList from '@/components/home-page/categories-projects-list';
import OrganizationProjectSection from '@/components/home-page/organization-project-section';
import IndividualProjectSection from '@/components/home-page/individual-project-section';
import TypeProjects from '@/components/home-page/type-projects';
import React from 'react';
import { useGetSettingPage } from '@/hooks/use-setting';
import { SETTING_TYPE } from './enum';

const HomePage = () => {
  const { data: banner } = useGetSettingPage({ key: SETTING_TYPE.BANNER });

  return (
    <>
      <div
        className='bg-main-banner min-h-[60vh] md:min-h-[80vh] lg:h-screen w-full relative flex items-center justify-center'
        style={{ backgroundImage: `url(${banner?.data?.image})` }}
      >
        {/* Notification Banner */}
        <div className='absolute left-1/2 top-6 md:top-10 transform -translate-x-1/2 md:left-10 md:translate-x-0 bg-white h-20 md:h-20 w-11/12 md:w-1/2 lg:w-[40%] rounded-full overflow-hidden flex items-center shadow-md'>
          <DonationNotificationBanner />
        </div>
        <div className='absolute inset-0 bg-black opacity-10'></div>
      </div>
      <div className='container space-y-6 md:space-y-4 2xl:max-w-[1200px] mx-auto flex flex-col gap-6 md:gap-8 px-2 sm:px-4 lg:px-0'>
        <CategoriesProjectsList />
        <Separator />
        <TypeProjects />
        <Separator />
        <OrganizationProjectSection />
        <IndividualProjectSection />
        <Separator />
        <MissionSection />
        <Separator />
        <PartnerSection />
        <Separator />
        <ArchivementSection />
        <Separator />
      </div>
      <SocialInfoSection />
    </>
  );
};

export default HomePage;
