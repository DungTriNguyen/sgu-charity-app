'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// Import Lightbox
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import Image from 'next/image';

const ProjectSwiper = ({ project }: { project: TCampaign }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const onLoadSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };
  return (
    <>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2 max-h-[450px]'
      >
        {[project?.background_image, ...project?.related_images].map(
          (item, index) => (
            <SwiperSlide
              key={index}
              className='rounded-lg overflow-hidden max-h-[450px] mr-10'
            >
              <div className='image-container' style={{ position: 'relative' }}>
                <Image
                  width={600}
                  height={450}
                  alt='img-project'
                  src={item}
                  className='w-full h-full bg-contain object-fill'
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                />
                <div
                  className='image-label rounded-2xl'
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    padding: '10px 20px 10px 20px',
                  }}
                >
                  {project?.category?.name}
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <Swiper
        onSwiper={onLoadSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper max-h-[100px] mt-6'
      >
        {[project?.background_image, ...project?.related_images].map(
          (item: string, index) => (
            <SwiperSlide
              key={index}
              className='rounded-lg overflow-hidden cursor-pointer'
            >
              <Image
                width={160}
                height={200}
                alt='image-project'
                src={item}
                className='w-full bg-contain max-h-[150px]'
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={[project?.background_image, ...project?.related_images].map(
          (img: string) => ({ src: img })
        )}
      />
    </>
  );
};

export default ProjectSwiper;
