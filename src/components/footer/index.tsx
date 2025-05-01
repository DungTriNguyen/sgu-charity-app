// ** import image
import { CAMPAIGN_TYPE } from '@/app/enum';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/sgu-logo.png';

const PROGRAMS_ITEMS = [
  {
    label: 'Tất cả chiến dịch',
    href: '/projects',
  },
  {
    label: 'Quyên góp tiền',
    href: `/projects?type=${CAMPAIGN_TYPE.DONATE}`,
  },
  {
    label: 'Đăng ký tình nguyện',
    href: `/projects?type=${CAMPAIGN_TYPE.VOLUNTEER}`,
  },
  {
    label: 'Quyên góp & ĐKTN',
    href: `/projects?type=${CAMPAIGN_TYPE.MULTIPLE}`,
  },
];

const ABOUT_ITEMS = [
  {
    label: 'Chính sách bảo mật',
    href: '/policy',
  },
  {
    label: 'Điều khoản',
    href: '/terms',
  },
  {
    label: 'Thống kê quyên góp',
    href: '/about-us',
  },
];

const CONTACT_ITEMS = [
  {
    label: 'Liên hệ',
    href: '/contact',
  },
  {
    label: 'Đăng ký chiến dịch',
    href: '/create-account',
  },
];

const Footer = () => {
  return (
    <section className='py-10 bg-gray-50 sm:pt-16 lg:pt-24'>
      <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
        <div className='grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12'>
          <div className='col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8'>
            <Link href='/' title=''>
              <Image
                className='w-auto h-11 m-auto'
                src={logo.src}
                alt=''
                height={48}
                width={48}
              />
            </Link>
          </div>

          <div>
            <p className='text-sm font-semibold tracking-widest text-gray-400 uppercase'>
              Chiến dịch
            </p>

            <ul className='mt-6 space-y-4'>
              {PROGRAMS_ITEMS.map((item, index) => (
                <li key={index}>
                  <Link
                    href={typeof item === 'string' ? item : item.href}
                    title=''
                    className='flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
                  >
                    {' '}
                    {typeof item === 'string' ? item : item.label}{' '}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold tracking-widest text-gray-400 uppercase'>
              Về chúng tôi
            </p>

            <ul className='mt-6 space-y-4'>
              {ABOUT_ITEMS.map((item, index) => (
                <li key={index}>
                  <Link
                    href={typeof item === 'string' ? item : item.href}
                    title=''
                    className='flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
                  >
                    {' '}
                    {typeof item === 'string' ? item : item.label}{' '}
                  </Link>
                </li>
              ))}

              {/* <li>
                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                    </li> */}
            </ul>
          </div>

          <div className='col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8'>
            <p className='text-sm font-semibold tracking-widest text-gray-400 uppercase'>
              Liên hệ
            </p>

            <ul className='mt-6 space-y-4'>
              {CONTACT_ITEMS.map((item, index) => (
                <li key={index}>
                  <Link
                    href={typeof item === 'string' ? item : item.href}
                    title=''
                    className='flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
                  >
                    {' '}
                    {typeof item === 'string' ? item : item.label}{' '}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className='mt-16 mb-10 border-gray-200' />

        <p className='text-sm text-center text-gray-600'>
          © Copyright 2025, tất cả nội dung thuộc quyền sở hữu của SGU-Charity
        </p>
      </div>
    </section>
  );
};

export default Footer;
