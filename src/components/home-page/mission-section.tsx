import Image from 'next/image';
import missionImage from '../../../public/our-mission.png';

const MissionSection = () => {
  return (
    <div className='py-4'>
      <h3 className='text-center text-3xl font-bold p-4'>
        Sứ mệnh của chúng tôi
      </h3>
      {/* <Separator className='mt-4' /> */}
      <p className='text-center mt-4'>
        “SGU Charity giúp trẻ em và thanh thiếu niên có hoàn cảnh khó khăn ở
        Việt Nam phát triển hết tiềm năng của mình thông qua nền tảng giáo dục
        chất lượng và phù hợp với nhu cầu”
      </p>
      <div className='w-full h-full'>
        <Image
          width={1440}
          height={100}
          src={missionImage.src}
          alt='misson'
          className='h-auto mt-4 object-cover aspect-auto'
        />
      </div>
    </div>
  );
};

export default MissionSection;
