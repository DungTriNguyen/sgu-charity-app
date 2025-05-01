import React from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { MoveRightIcon } from 'lucide-react';
import FacebookIcon from '../icons/facebook-icon';
import InstagramIcon from '../icons/instagram-icon';
import TiktokIcon from '../icons/tiktok-icon';
import TwitterIcon from '../icons/twitter-icon';
import Link from 'next/link';

const OfficeInfo = () => {
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
    <div className='max-md:ml-4 max-md:mr-4'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-3xl font-bold'>Văn phòng của chúng tôi</h3>
        <p>
          Hãy ghé thăm SGU charity để quyên góp cho các chương trình của chúng
          tôi, thảo luận về mối quan hệ hợp tác hoặc đơn giản là ghé thăm để nói
          lời chào.
        </p>
        <p>
          <b>Địa chỉ: </b>273 Đ. An Đ. Vương, Phường 2, Quận 5, TP. Hồ Chí Minh,
          Việt Nam
        </p>
        <p>
          <b>Số điện thoại: </b>+84 283 827 8787
        </p>
        <p>
          <b>Giờ làm việc: </b>Thứ 2 - Thứ 6, 9h - 18h
        </p>
        <p>
          <b>Email: </b>daihocsaigon@sgu.edu.vn
        </p>
        <p>Dõi theo chúng tôi trên mạng xã hội</p>
        <div className='flex gap-4 '>
          {socialInfo.map((item) => (
            <Link
              href={item.href}
              key={item.key}
              className='flex flex-col items-center h-12 w-12 '
              target='_blank'
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
      <Separator className='my-4' />
      <h4 className='text-primary font-bold text-xl'>
        Bạn cần cập nhật thông tin cá nhân?
      </h4>
      <p className='mt-4'>
        Hãy ghé thăm SGU charity để quyên góp cho các chương trình của chúng
        tôi, thảo luận về mối quan hệ hợp tác hoặc đơn giản là ghé thăm để nói
        lời chào.
      </p>
      <Link href='/user/edit-profile'>
        <Button variant={'link'} className='p-0'>
          Cập nhật thông tin của bạn ở đây
          <MoveRightIcon />
        </Button>
      </Link>
      <Separator className='my-4' />
      <h4 className='font-bold text-xl'>Bản đồ</h4>
      <div className='rounded-xl overflow-hidden h-[300px]'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6027.512847192194!2d106.67968337655424!3d10.759922359494851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e1!3m2!1svi!2s!4v1741253083695!5m2!1svi!2s'
          width='600'
          height='450'
          loading='lazy'
        ></iframe>
      </div>
    </div>
  );
};

export default OfficeInfo;
