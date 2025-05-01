'use client';
import { USER_ROLES } from '@/app/enum';
import UserTab from '@/components/user/user-tab';
import { useGetListUserProfileQuery } from '@/hooks/use-profile';
import { useParams } from 'next/navigation';
import React from 'react';

const DetailAccountPage = () => {
  const params = useParams();
  const { data: userData } = useGetListUserProfileQuery({
    username: params?.id as string,
  });
  return (
    <div>
      {userData?.data?.[0] ? (
        <UserTab
          role={userData?.data?.[0]?.type as USER_ROLES}
          detail={userData?.data?.[0] as TUser}
        />
      ) : null}
    </div>
  );
};

export default DetailAccountPage;
