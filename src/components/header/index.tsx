'use client';

import { CAMPAIGN_TYPE } from '@/app/enum';
import { Avatar } from '@radix-ui/react-avatar';
import {
  ChevronDownIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import logo from '../../../public/sgu-logo.png';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { AvatarFallback, AvatarImage } from '../ui/avatar';
import QuickSearchProjectDropdown from './quick-search-project-dropdown';
import { useGetUserProfileQuery } from '@/hooks/use-profile';

const Header = () => {
  const router = useRouter();
  const { data: userProfile } = useGetUserProfileQuery();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ACTIVITIES_ITEMS = [
    {
      label: 'Quyên góp tiền',
      href: `/projects?type=${CAMPAIGN_TYPE.DONATE}`,
      icon: '💰',
    },
    {
      label: 'Đăng ký tình nguyện viên',
      href: `/projects?type=${CAMPAIGN_TYPE.VOLUNTEER}`,
      icon: '🤝',
    },
    {
      label: 'Quyên góp và ĐKTNV',
      href: `/projects?type=${CAMPAIGN_TYPE.MULTIPLE}`,
      icon: '❤️',
    },
  ];

  const CATEGORY_ITEMS = [
    {
      label: 'Chiến dịch',
      href: '/projects',
      icon: '📢',
    },
    {
      label: 'Tổ chức gây quỹ',
      href: '/accounts?type=organization',
      icon: '🏢',
    },
    {
      label: 'Cá nhân gây quỹ',
      href: '/accounts?type=individual',
      icon: '👤',
    },
  ];

  const ABOUT_US_ITEMS = [
    {
      label: 'Thông tin chung',
      href: '/about-us',
      icon: 'ℹ️',
    },
    {
      label: 'Điều khoản ',
      href: '/terms',
      icon: '📖',
    },
    {
      label: 'Chính sách bảo mật',
      href: '/policy',
      icon: '🔒',
    },
    {
      label: 'Liên hệ',
      href: '/contact',
      icon: '📞',
    },
  ];

  const INFORMATION_USER_ITEMS = [
    {
      label: 'Xem trang cá nhân',
      href: '/user/profile',
      icon: '👤',
    },
    {
      label: 'Chỉnh sửa thông tin cá nhân',
      href: '/user/edit-profile',
      icon: '📖',
    },
    {
      label: 'Đổi mật khẩu',
      href: '/user/change-password',
      icon: '🔒',
    },
    {
      label: 'Lịch sử ủng hộ/ ĐK TNV',
      href: '/user/donated-history',
      icon: '❤️',
    },
  ];

  const renderMenu = (
    menuItems: { label: string; href: string; icon: string }[],
    header: string
  ) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='font-medium text-base md:text-lg hover:bg-primary/10 hover:text-primary transition-colors'
          >
            <span>{header}</span>
            <ChevronDownIcon className='ml-1 h-4 w-4 md:h-6 md:w-6' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56 md:w-64'
          side='bottom'
          align='center'
        >
          {menuItems.map(({ href, label, icon }, index) => (
            <React.Fragment key={index}>
              <DropdownMenuItem
                onClick={() => router.push(href)}
                className='py-2 md:py-3 text-sm md:text-base cursor-pointer hover:bg-primary/10'
              >
                <span className='mr-2 text-lg md:text-xl'>{icon}</span>
                {label}
              </DropdownMenuItem>
              {index < menuItems.length - 1 && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderMobileMenu = () => {
    return (
      <div className='fixed inset-0 bg-white z-50 md:hidden'>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between p-4 border-b'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src={logo}
                alt='Logo'
                width={40}
                height={40}
                className='object-contain'
              />
              <span className='font-bold text-lg text-primary'>SGUCharity</span>
            </Link>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <XIcon className='h-6 w-6' />
            </Button>
          </div>
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            <div className='space-y-2'>
              <h3 className='font-medium text-lg'>Danh mục</h3>
              {CATEGORY_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  variant='ghost'
                  className='w-full justify-start text-base'
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className='mr-2'>{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </div>
            <div className='space-y-2'>
              <h3 className='font-medium text-lg'>Hoạt động</h3>
              {ACTIVITIES_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  variant='ghost'
                  className='w-full justify-start text-base'
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className='mr-2'>{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </div>
            <div className='space-y-2'>
              <h3 className='font-medium text-lg'>Về chúng tôi</h3>
              {ABOUT_US_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  variant='ghost'
                  className='w-full justify-start text-base'
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className='mr-2'>{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className='p-4 border-t'>
            {userProfile ? (
              <div className='space-y-2'>
                <div className='flex items-center gap-2 p-2'>
                  <Avatar className='w-8 h-8'>
                    <AvatarImage
                      src={userProfile?.data?.avatar_url}
                      alt='@shadcn'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className='font-medium'>{userProfile?.data?.name}</span>
                </div>
                {INFORMATION_USER_ITEMS.map((item) => (
                  <Button
                    key={item.href}
                    variant='ghost'
                    className='w-full justify-start text-base'
                    onClick={() => {
                      router.push(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className='mr-2'>{item.icon}</span>
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant='ghost'
                  className='w-full justify-start text-base text-red-500'
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOutIcon className='mr-2 h-5 w-5' />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Button
                variant='default'
                className='w-full gap-2'
                onClick={() => {
                  router.push('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogInIcon className='h-5 w-5' />
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/login', redirect: true });
  };

  return (
    <header className='w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50'>
      <nav className='container 2xl:max-w-[1200px] mx-auto h-14 md:h-16 flex items-center justify-between px-4'>
        <div className='flex items-center gap-4 md:gap-6'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src={logo}
              alt='Logo'
              width={40}
              height={40}
              className='object-contain md:w-12 md:h-12'
            />
            <span className='font-bold text-lg md:text-xl text-primary'>
              SGUCharity
            </span>
          </Link>

          <div className='hidden md:flex items-center gap-4 pl-[160px] pr-2'>
            {renderMenu(CATEGORY_ITEMS, 'Danh mục')}
            {renderMenu(ACTIVITIES_ITEMS, 'Hoạt động')}
            {renderMenu(ABOUT_US_ITEMS, 'Về chúng tôi')}
          </div>
        </div>

        <div className='flex items-center gap-2 md:gap-4'>
          <div className='hidden md:flex items-center gap-4'>
            <Link href='/create-account' className='flex items-center gap-2'>
              <Button variant='default' className='hover:opacity-70'>
                Tạo dự án
              </Button>
            </Link>
          </div>

          <QuickSearchProjectDropdown />

          {userProfile ? (
            <div className='hidden md:flex items-center gap-2'>
              <Avatar className='w-8 h-8 mx-auto rounded-full overflow-hidden'>
                <AvatarImage
                  src={userProfile?.data?.avatar_url}
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {renderMenu(INFORMATION_USER_ITEMS, '')}
              <Button
                variant='ghost'
                className='gap-2 hover:bg-primary/10'
                onClick={logout}
              >
                <LogOutIcon className='h-5 w-5 md:h-6 md:w-6' />
                <span className='hidden md:inline'>Đăng xuất</span>
              </Button>
            </div>
          ) : (
            <Button
              variant='default'
              className='hidden md:flex gap-2'
              onClick={() => router.push('/login')}
            >
              <LogInIcon className='h-5 w-5 md:h-6 md:w-6' />
              Đăng nhập
            </Button>
          )}

          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className='h-6 w-6' />
          </Button>
        </div>
      </nav>
      {isMobileMenuOpen && renderMobileMenu()}
    </header>
  );
};

export default Header;
