import { CAMPAIGN_ROLE } from '@/app/enum';
import { useGetProjectQuery } from '@/hooks/use-project';
import { MoveRightIcon } from 'lucide-react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectItem from '../project/project-item';
import { Button } from '../ui/button';

const OrganizationProjectSection = () => {
  const { data: project } = useGetProjectQuery({
    role: CAMPAIGN_ROLE.ORIGANIZATION,
  });

  return (
    <div>
      <h3 className='text-3xl font-bold text-center'>
        Các chiến dịch gây quỹ đang diễn ra
      </h3>
      <div className='flex justify-between items-center mb-6'>
        <span className='font-bold'>Chiến dịch của tổ chức</span>
        <Link href='/projects?filter=organization'>
          <Button variant={'link'}>
            Xem tất cả <MoveRightIcon size={24} />
          </Button>
        </Link>
      </div>
      <div className='w-full max-w-[1440px] mx-auto'>
        <div className='relative [&_.swiper]:pb-10 [&_.swiper-pagination]:bottom-0 [&_.swiper-button-prev]:top-[35%] [&_.swiper-button-next]:top-[35%]'>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Thumbs]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className='relative'
          >
            {project?.data?.map((item: TCampaign) => (
              <SwiperSlide key={item.id}>
                <ProjectItem key={item.id} project={item} />
              </SwiperSlide>
            ))}
            <div className='swiper-pagination !bottom-[-20px]' />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProjectSection;
