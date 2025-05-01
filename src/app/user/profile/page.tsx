'use client';
import { USER_ROLES } from '@/app/enum';
import UserTab from '@/components/user/user-tab';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';

const ProfilePage = () => {
  const session = useSession();

  // mock user role
  // const userRole: USER_ROLES = USER_ROLES.USER as USER_ROLES;
  // const userRole: USER_ROLES = USER_ROLES.INDIVIDUAL as USER_ROLES;
  // const userRole: USER_ROLES = USER_ROLES.ORIGANIZATION as USER_ROLES;

  const userRole = useMemo(() => {
    return session?.data?.user?.detail?.type || USER_ROLES.USER;
  }, [session?.data]);

  return (
    <div>
      {session.data ? (
        <UserTab
          role={userRole as USER_ROLES}
          detail={session?.data?.user?.detail as TUser}
        />
      ) : null}
    </div>
  );
};

export default ProfilePage;
