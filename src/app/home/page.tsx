'use client';

import ArchivementSection from '@/components/home-page/archivement-section';
import MissionSection from '@/components/home-page/mission-section';
import PartnerSection from '@/components/home-page/partner-section';
import SocialInfoSection from '@/components/home-page/social-info-section';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

// phần em chỉnh
import CategoriesProjectsList from '@/components/home-page/categories-projects-list';
import IndividualProjectSection from '@/components/home-page/individual-project-section';
import OrganizationProjectSection from '@/components/home-page/organization-project-section';
import TypeProjects from '@/components/home-page/type-projects';
import { useDonationQuery } from '@/hooks/use-donation';
import DonationNotificationBanner from '@/components/home-page/donation-notification-banner';

const HomePage = () => {
  return (
    <>
      <div className='bg-main-banner h-screen w-full relative'>
        <DonationNotificationBanner />
        {/* Notification Banner */}
        {/* <div className='absolute top-8 left-8 bg-white/90 backdrop-blur rounded-full shadow-lg p-4 max-w-md w-full z-10 items-between justify-between'>
          <div className='flex items-center gap-4'>
            <div className='relative w-12 h-12'>
              <Image
                src={
                  dataDonate?.data?.[0]?.user?.avatar_url ||
                  '/images/avatar.png'
                }
                alt='User Avatar'
                fill
                className='rounded-full object-cover'
              />
            </div>
            <div>
              <p className='font-medium text-base'>
                {dataDonate?.data?.[0]?.user?.name}
              </p>
              <p className='text-sm text-gray-600'>
                Đã ủng hộ {dataDonate?.data?.[0]?.amount.toLocaleString()} VND
              </p>
              <p className='text-sm text-gray-500'>
                {dataDonate?.data?.[0]?.created_at}
              </p>
            </div>
          </div>
        </div> */}
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-black opacity-10'></div>
      </div>
      <div className='container 2xl:max-w-[1200px] mx-auto flex flex-col gap-8'>
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
