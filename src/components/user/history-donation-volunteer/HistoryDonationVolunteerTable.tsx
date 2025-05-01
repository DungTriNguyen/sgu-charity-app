'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetUserProfileQuery } from '@/hooks/use-profile';
import OwnedDonateList from '../owned-donate-list';
import OwndedParticipantList from '../owned-participant-list';

const HistoryDonationVolunteerTable = () => {
  const { data: userProfile } = useGetUserProfileQuery();
  const tabList = [
    {
      label: 'Ủng hộ',
      value: 'donate',
      component: (
        <OwnedDonateList type='donate' userId={userProfile?.data?.id} />
      ),
    },
    {
      label: 'Tham gia',
      value: 'participate',
      component: <OwndedParticipantList userId={userProfile?.data?.id} />,
    },
  ];
  return (
    <div className='flex flex-col gap-4 w-full'>
      <Tabs className='w-full mt-2' defaultValue={tabList[0].value}>
        <TabsList className='flex items-center gap-2 justify-start bg-white flex-wrap'>
          {tabList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full'
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabList.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HistoryDonationVolunteerTable;
