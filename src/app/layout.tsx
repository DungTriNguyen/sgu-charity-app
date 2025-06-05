import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TanstackProvider } from './providers/tanstack-provider';
import LayoutTemplate from '@/components/layout-template';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SGU Charity',
  description:
    'SGU Charity là tổ chức sinh viên tình nguyện, kêu gọi ủng hộ tiền và đăng ký tham gia các hoạt động vì cộng đồng.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <LayoutTemplate>{children}</LayoutTemplate>
        </TanstackProvider>
        <Toaster position='top-right' duration={5000} />
      </body>
    </html>
  );
}
