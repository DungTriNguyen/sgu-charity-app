'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './header';
import Footer from './footer';
import { SessionProvider } from 'next-auth/react';

const EXCLUDED_HEADER_FOOTER_PATHS = [
  '/login',
  '/sign-up',
  '/forgot-password',
  '/enter-change-new-password',
];

const LayoutTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  if (EXCLUDED_HEADER_FOOTER_PATHS.includes(pathName)) {
    return <SessionProvider>{children}</SessionProvider>;
  }
  return (
    <SessionProvider>
      <Header />
      {children}
      <Footer />
    </SessionProvider>
  );
};

export default LayoutTemplate;
