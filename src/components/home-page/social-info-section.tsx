import Link from 'next/link';
import React from 'react';
import FacebookIcon from '../icons/facebook-icon';
import InstagramIcon from '../icons/instagram-icon';
import TiktokIcon from '../icons/tiktok-icon';
import TwitterIcon from '../icons/twitter-icon';

const SocialInfoSection = () => {
  const socialInfo = [
    {
      key: 'instagram',
      href: 'https://www.sgu.edu.vn/',
      icon: <InstagramIcon />,
    },
    {
      key: 'facebook',
      href: 'https://www.facebook.com/TruongDaihocSaiGon.SGU',
      icon: <FacebookIcon />,
    },

    {
      key: 'twitter',
      href: 'https://www.sgu.edu.vn/',
      icon: <TwitterIcon />,
    },
    {
      key: 'tiktok',
      href: 'https://www.sgu.edu.vn/',
      icon: <TiktokIcon />,
    },
  ];
  return (
    <div className='mt-8'>
      <h3 className='text-3xl font-bold text-center p-4'>
        Liên hệ với chúng tôi
      </h3>
      <p className='mt-4 text-center'>
        “Tri ân những cá nhân và tổ chức đã có những đóng góp tích cực và to lớn
        trong tất cả các chương trình đã và đang diễn ra”
      </p>

      <div className='flex justify-around items-center mx-auto mt-4 bg-[#0BAEFF] bg-opacity-50 py-4'>
        {socialInfo.map((item) => (
          <Link
            href={item.href}
            key={item.key}
            className='flex flex-col items-center max-md:w-1/2'
            target='_blank'
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialInfoSection;
