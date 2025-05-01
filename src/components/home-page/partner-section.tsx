'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SETTING_TYPE } from '@/app/enum';
import { useGetSettingPage } from '@/hooks/use-setting';

const PartnerSection: React.FC = () => {
  const {
    data: companionUnit,
    isLoading,
    isError,
  } = useGetSettingPage({
    key: SETTING_TYPE.COMPANION_UNIT,
  });

  // Fix lỗi hydration bằng cách render chỉ khi dữ liệu đã có
  // const [isClient, setIsClient] = useState(false);
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) return null; // Không render gì cả cho đến khi client load xong

  if (isLoading) return <p>Loading...</p>;
  if (isError || !companionUnit?.data?.images?.length)
    return <p>Error loading partners or no images available.</p>;

  return (
    <div>
      <h3 className='text-3xl font-bold text-center p-4'>Đơn vị đồng hành</h3>
      <p className='text-center'>
        “Tri ân những cá nhân và tổ chức đã có những đóng góp tích cực và to lớn
        trong tất cả các chương trình đã và đang diễn ra”
      </p>
      <ul className='flex justify-around items-center gap-4 flex-wrap'>
        {companionUnit?.data?.images?.map((image: string, index: number) => (
          <li key={index}>
            <Image
              width={160}
              height={160}
              src={image}
              alt={`Partner ${index + 1}`}
              className=''
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnerSection;
