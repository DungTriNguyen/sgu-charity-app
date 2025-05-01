'use client';
import React, { Suspense } from 'react';
import AccountFilter from '@/components/accounts/account-filter';

const AccountsPage = () => {
  return (
    <div className='container 2xl:max-w-[1200px] mx-auto flex flex-col gap-8 my-8'>
      <Suspense fallback={<div>Loading filters...</div>}>
        <AccountFilter />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
