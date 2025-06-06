import { Card } from '../ui/card';
import { Description } from '@radix-ui/react-toast';
import { useGetUserProfileQuery } from '@/hooks/use-profile';

const Introduce = ({ data }: { data: TUser }) => {
  const userData = useGetUserProfileQuery();

  return (
    <div className='w-full'>
      <Card className='shadow-md hover:shadow-lg transition-shadow duration-300'>
        <div className='flex flex-col gap-4 p-6 justify-center items-center'>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            Giới thiệu
          </h3>
          <div className='w-full max-w-2xl'>
            <Description className='text-gray-700 italic text-center leading-relaxed'>
              &ldquo;
              {userData?.data?.data?.description ||
                'Chưa có thông tin giới thiệu'}
              &rdquo;
            </Description>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Introduce;
