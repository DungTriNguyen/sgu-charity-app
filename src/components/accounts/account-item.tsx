import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { formatCurrencyToVND } from '@/lib/utils';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { format } from 'date-fns';

const AccountItem = ({ data }: { data: TUser }) => {
  return (
    <li className='flex flex-col gap-2 rounded-xl p-3 md:p-4 bg-white shadow-md hover:shadow-lg transition-shadow'>
      <div className='flex gap-2 items-center'>
        <Avatar className='h-10 w-10 md:h-12 md:w-12'>
          <AvatarImage src={data?.avatar_url} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='block'>
          <p className='font-bold text-sm md:text-base'>{data?.name}</p>
          <p className='text-gray-400 text-xs md:text-sm'>@{data?.username}</p>
        </div>
      </div>
      <Separator className='bg-primary' />
      <div className='space-y-1 md:space-y-2'>
        <p className='text-sm md:text-base'>
          Tài khoản thiện nguyện số:{' '}
          <span className='font-bold'>{data?.id}</span>
        </p>
        <p className='text-sm md:text-base'>
          Số tiền gây quỹ:{' '}
          <span className='font-bold'>
            {formatCurrencyToVND(data?.projects_donations_sum_amount)}
          </span>
        </p>
        <p className='text-sm md:text-base'>
          Tham gia từ:{' '}
          <span className='font-bold'>
            {format(new Date(data?.birth_of_date), 'MM/yyyy')}
          </span>
        </p>
      </div>
      <Link
        href={`/accounts/${data?.username}`}
        className='font-bold text-primary flex gap-1 hover:underline items-center text-sm md:text-base mt-1'
      >
        Xem chi tiết{' '}
        <ChevronRightIcon width={14} height={14} className='md:w-4 md:h-4' />
      </Link>
    </li>
  );
};

export default AccountItem;
