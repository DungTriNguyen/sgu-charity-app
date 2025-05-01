'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useGetUserProfileQuery,
  useUpdateUserAvatarMutation,
} from '@/hooks/use-profile';
import { usePathname } from 'next/navigation';
import React, { useMemo, useRef } from 'react';

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  // console.log();

  const { data: profile } = useGetUserProfileQuery();
  const { mutate } = useUpdateUserAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const getTitlePage = useMemo(() => {
    switch (pathname) {
      case '/user/profile':
        return 'Trang cá nhân';
      case '/user/edit-profile':
        return 'Thông tin cá nhân';
      // case '/user/donation':
      //   return 'Quyên góp của tôi';
      // case '/user/volunteer':
      //   return 'Tình nguyện viên của tôi';
      default:
        return '';
    }
  }, [pathname]);

  const toBase64 = (file: File) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload logic here
      // console.log('Selected file:', file);
      // You can use a function to upload the file and update the avatar URL
      const payload = new Promise(async (resolve) => {
        const base64 = await toBase64(file);
        resolve({
          name: file.name,
          base64,
        });
      }).then((res) => {
        mutate(res as TUploadImage);
        return 1;
      });
      return payload;
    }
  };
  return (
    <>
      <div className=''>
        <div className='relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full'>
          <div className='absolute inset-0 bg-user-profile bg-cover lg:bg-top bg-center'></div>
          <div className='absolute inset-0 bg-black/35'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4'>
              {getTitlePage}
            </div>
          </div>
        </div>
        <div className='container 2xl:max-w-[1200px] mx-auto my-2 relative pt-12 px-2 md:px-4 space-y-6'>
          <div className='absolute top-[-84px] left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
            <Avatar
              className='w-28 h-28 md:w-40 md:h-40 mx-auto rounded-full border-4 border-primary shadow-md transition-all duration-300'
              onClick={handleAvatarClick}
            >
              <AvatarImage src={profile?.data?.avatar_url} alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className='text-center font-bold text-base md:text-lg mt-2'>
              {profile?.data?.name}
            </div>
            <div className='text-center text-sm md:text-base'>
              @{profile?.data?.username}
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
