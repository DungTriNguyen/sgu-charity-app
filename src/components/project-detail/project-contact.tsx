import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import FacebookIcon from '../icons/facebook-icon';
import Link from 'next/link';
import GmailIcon from '../icons/gmail-icon';
import TelephoneIcon from '../icons/telephone-icon';

const ProjectContact = ({ project }: { project: TCampaign }) => {
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-numeric characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Check if the input is of correct length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  };
  return (
    <Card className='p-6 flex flex-col gap-2'>
      <h4>Thông tin tổ chức / cá nhân vận động chiến dịch </h4>
      <Link href={`/accounts/${project?.user?.username}`}>
        <div className='flex gap-2 items-center'>
          <Image
            alt='avatar'
            width={48}
            height={48}
            src={project?.user?.avatar_url}
            className='rounded-full aspect-square'
          />
          <div>
            <p className='text-base text-[#1DA1F2]'>{project?.user?.name}</p>
            <Badge className='rounded-full'>
              {project?.is_organization ? 'Tổ chức' : 'Cá nhân'}
            </Badge>
          </div>
        </div>
      </Link>
      <div className='flex gap-2 items-center'>
        <FacebookIcon width='36' height='36' />
        <Link href={'https://facebook.com'}>
          {project.user.facebook || 'Đang cập nhật...'}
        </Link>
      </div>
      <div className='flex gap-2 items-center'>
        <GmailIcon width='36' height='36' />
        <Link href={'https://gmail.com'}>
          {project.user.email || 'Đang cập nhật...'}
        </Link>
      </div>
      <div className='flex gap-2 items-center'>
        <TelephoneIcon width='36' height='36' />
        <Link href={'https://gmail.com'}>
          {project.user.phone_number
            ? formatPhoneNumber(project.user.phone_number)
            : 'Đang cập nhật...'}
        </Link>
      </div>
    </Card>
  );
};

export default ProjectContact;
