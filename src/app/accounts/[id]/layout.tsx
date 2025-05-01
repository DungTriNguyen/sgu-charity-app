'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetListUserProfileQuery } from '@/hooks/use-profile';
import { useParams } from 'next/navigation';
import React from 'react';

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const params = useParams();

  const { data: userData } = useGetListUserProfileQuery({
    username: params?.id as string,
  });

  return (
    <>
      <div className=''>
        <div className='relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full'>
          <div className='absolute inset-0 bg-user-profile bg-cover lg:bg-top bg-center'></div>
          <div className='absolute inset-0 bg-black/35'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4'>
              Thông tin Người dùng
            </div>
          </div>
        </div>
        <div className='container 2xl:max-w-[1200px] mx-auto my-2 relative pt-12 px-2 md:px-4 space-y-6'>
          <div className='absolute top-[-84px] left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
            <Avatar className='w-28 h-28 md:w-40 md:h-40 mx-auto rounded-full border-4 border-primary shadow-md transition-all duration-300'>
              <AvatarImage
                src={userData?.data?.[0]?.avatar_url}
                alt='@shadcn'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='text-center font-bold text-base md:text-lg mt-2'>
              {userData?.data?.[0]?.name}
            </div>
            <div className='text-center text-sm md:text-base'>
              @{userData?.data?.[0]?.username}
            </div>
          </div>
          <div className='container 2xl:max-w-[1200px] mx-auto my-2 relative pt-12 px-2 md:px-4'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
