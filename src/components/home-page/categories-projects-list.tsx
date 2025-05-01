'use client';

import { useGetCategoryQuery } from '@/hooks/use-categories';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CampaignSlider = () => {
  const { data: category } = useGetCategoryQuery();

  return (
    <div className='relative [&_.swiper-button-prev]:top-[35%] [&_.swiper-button-next]:top-[35%] [&_.swiper-button-prev]:text-[#0BAEFF] [&_.swiper-button-next]:text-[#0BAEFF] py-12 [&_.swiper-button-prev]:scale-50 [&_.swiper-button-next]:scale-50 [&_.swiper-button-prev]::after:text-sm [&_.swiper-button-next]::after:text-sm'>
      <div className='[&>.swiper]:px-[25px]'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={4}
          navigation
          breakpoints={{
            320: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
          className='relative'
        >
          {category?.data?.map((categories: TSCategotyData) => {
            // Function to modify SVG with custom classes
            const customizeSvg = (svgString: string) => {
              if (!svgString) return '';

              // Add custom classes and potentially modify other attributes
              return svgString.replace(
                '<svg',
                `<svg 
      class="w-5 h-5 text-[#0BAEFF] group-hover:text-white"`
              );
            };
            return (
              <SwiperSlide
                key={categories.id}
                className='flex items-center justify-between gap-2 cursor-pointer group py-4 px-[25px]'
              >
                <Link href={`/projects?category=${categories.id}`}>
                  <div
                    className='p-2.5 rounded-full bg-[#0BAEFF]/10 group-hover:bg-[#ffffff] transition-colors '
                    dangerouslySetInnerHTML={{
                      __html: customizeSvg(categories.icon),
                    }}
                  >
                    {/* <categories.icon className='w-5 h-5 text-[#0BAEFF] group-hover:text-white' /> */}
                  </div>
                  <span className='text-sm text-gray-600 group-hover:text-[#0BAEFF] transition-colors'>
                    {categories.name}
                  </span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CampaignSlider;
