import { CAMPAIGN_TYPE } from '@/app/enum';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrencyToVND } from '@/lib/utils';
import React from 'react';

const ManagedProjectItem = ({ project }: { project: TCampaign }) => {
  return (
    <Card className='p-4 flex gap-6 items-center'>
      {project !== null ? (
        <>
          <div
            className='h-[200px] relative rounded-lg w-1/3 bg-cover bg-no-repeat object-cover overflow-hidden'
            style={{ backgroundImage: `url('${project.background_image}')` }}
          >
            <label
              htmlFor='category'
              className='absolute text-[#1CA0F2] top-1 right-1 bg-white rounded-full p-1  '
            >
              {project.category.name}
            </label>
          </div>
          <div className='w-2/3'>
            <h5 className='font-bold text-lg'>{project.name}</h5>
            <p>
              Tạo bởi{' '}
              <span className='text-primary font-bold'>
                {project.user.name}
              </span>
            </p>
            {CAMPAIGN_TYPE.DONATE === project.type && (
              <>
                <p className='flex justify-between mt-4'>
                  <span>
                    Số tiền đã đạt được{' '}
                    <span className='text-primary font-bold'>
                      {formatCurrencyToVND(
                        Number(project?.donations_with_paid_sum_amount || 0)
                      )}
                      /
                      {formatCurrencyToVND(
                        Number(project?.donation_target) || 0
                      )}
                    </span>
                  </span>
                </p>
                <Progress
                  value={
                    (Number(project?.donations_with_paid_sum_amount || 0) /
                      Number(project?.donation_target || 1)) *
                    100
                  }
                  className='mt-0'
                />
              </>
            )}
            {CAMPAIGN_TYPE.VOLUNTEER === project.type && (
              <>
                <p className='flex justify-between mt-4'>
                  <span>
                    Số TNV đã đăng ký{' '}
                    <span className='text-primary font-bold'>
                      {project?.volunteers_without_canceled_count || 0}/
                      {project?.volunteer_quantity || 0} TNV
                    </span>
                  </span>
                </p>
                <Progress
                  value={
                    (Number(project?.volunteers_without_canceled_count || 0) /
                      Number(project?.volunteer_quantity || 1)) *
                    100
                  }
                  className='mt-0'
                />
              </>
            )}
            {CAMPAIGN_TYPE.MULTIPLE === project.type && (
              <>
                <p className='flex justify-between mt-4'>
                  <span>
                    Số tiền đã đạt được{' '}
                    <span className='text-primary font-bold'>
                      {formatCurrencyToVND(
                        Number(project?.donations_with_paid_sum_amount || 0)
                      )}
                      /
                      {formatCurrencyToVND(
                        Number(project?.donation_target) || 0
                      )}
                    </span>
                  </span>
                </p>
                <Progress
                  value={
                    (Number(project?.donations_with_paid_sum_amount || 0) /
                      Number(project?.donation_target || 1)) *
                    100
                  }
                  className='mt-0'
                />
                <p className='flex justify-between mt-4'>
                  <span>
                    Số TNV đã đăng ký{' '}
                    <span className='text-primary font-bold'>
                      {project?.volunteers_without_canceled_count || 0}/
                      {project?.volunteer_quantity || 0} TNV
                    </span>
                  </span>
                </p>
                <Progress
                  value={
                    (Number(project?.volunteers_without_canceled_count || 0) /
                      Number(project?.volunteer_quantity || 1)) *
                    100
                  }
                  className='mt-0'
                />
              </>
            )}

            <p className='flex justify-between mt-4'>
              {(CAMPAIGN_TYPE.DONATE === project.type ||
                CAMPAIGN_TYPE.MULTIPLE === project.type) && (
                <>
                  <span>
                    Số lượt ủng hộ:{' '}
                    <span className='font-bold'>
                      {project?.donations_with_paid_count || 0} lượt
                    </span>
                  </span>
                </>
              )}

              <span className='font-bold'>
                <span className='font-normal'>Thời gian </span>
                {project.diff_date || 0}
              </span>
            </p>
          </div>
        </>
      ) : (
        <div className='text-center text-muted-foreground'>Không có dự án</div>
      )}
    </Card>
  );
};

export default ManagedProjectItem;
