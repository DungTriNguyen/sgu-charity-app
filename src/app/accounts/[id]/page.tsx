'use client';
import React, { Suspense } from 'react';
import { USER_ROLES } from '@/app/enum';
import UserTab from '@/components/user/user-tab';
import { useGetListUserProfileQuery } from '@/hooks/use-profile';
import { useParams } from 'next/navigation';

// Tách phần xử lý dữ liệu user ra component riêng
const UserTabWrapper = () => {
  const params = useParams();
  const { data: userData } = useGetListUserProfileQuery({
    username: params?.id as string,
  });

  const user = userData?.data?.[0];

  if (!user) return null;

  return <UserTab role={user.type as USER_ROLES} detail={user as TUser} />;
};

const DetailAccountPage = () => {
  return (
    <Suspense
      fallback={
        <div className='text-center py-10'>Đang tải chi tiết tài khoản...</div>
      }
    >
      <UserTabWrapper />
    </Suspense>
  );
};

export default DetailAccountPage;
