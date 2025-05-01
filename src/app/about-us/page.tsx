'use client';
import React from 'react';
import SummarySection from '@/components/about-us/summary-section';
import MemberSection from '@/components/about-us/member-section';
import FounderSection from '@/components/about-us/founder-section';
import MoreDetailSection from '@/components/about-us/more-detail-section';
import FollowSection from '@/components/about-us/follow-section';

const AboutUsPage = () => {
  return (
    <div className='min-h-screen'>
      {/* Banner Section */}
      <div className='relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full'>
        <div className='absolute inset-0 bg-about-us-banner bg-cover bg-center'></div>
        <div className='absolute inset-0 bg-black/35'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4'>
            VỀ CHÚNG TÔI
          </h1>
        </div>
      </div>

      {/* Content Sections */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-32 space-y-12 sm:space-y-16 lg:space-y-[128px]'>
        <SummarySection />
        <MemberSection />
        <FounderSection />
        <MoreDetailSection />
      </div>

      {/* Follow Section with gray background */}
      <div className='bg-gray-100'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
          <FollowSection />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
