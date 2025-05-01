import { USER_ROLES } from '@/app/enum';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Introduce from './Introduce';
import ManagedProjectList from './managed-project/managed-project-list';
import OwnedDonateList from './owned-donate-list';
import OwnedParticipantList from './owned-participant-list';
import SummaryInfo from './summary-info';

const UserTab = ({
  role = USER_ROLES.USER,
  detail,
}: {
  role: USER_ROLES;
  detail: TUser;
}) => {
  const menuUser: {
    label: string;
    value: string;
    component: React.ReactNode;
  }[] = [
    {
      label: 'giới thiệu',
      value: 'introduce',
      component: <Introduce data={detail as TUser} />,
    },
    {
      label: 'Ủng hộ',
      value: 'donate',
      component: <OwnedDonateList type='donate' userId={detail.id} />,
    },
    {
      label: 'Tham gia',
      value: 'participate',
      component: <OwnedParticipantList userId={detail.id} />, // need to be separate component
    },
  ];

  const agentUser: {
    label: string;
    value: string;
    component: React.ReactNode;
  }[] = [
    {
      label: 'giới thiệu',
      value: 'introduce',
      component: <Introduce data={detail as TUser} />,
    },
    {
      label: 'Chiến dịch',
      value: 'campaign',
      component: <ManagedProjectList userId={detail.id} />,
    },
    {
      label: 'Người tham gia',
      value: 'participate',
      component: (
        <OwnedParticipantList
          userId={detail.id}
          keyParam='projects_belong_to_user_id'
        />
      ),
    },
    {
      label: 'Người ủng hộ',
      value: 'supporter',
      component: (
        <OwnedDonateList
          type='donate'
          keyParam='projects_belong_to_user_id'
          userId={detail.id}
        />
      ),
    },
    {
      label: 'Sao kê',
      value: 'report',
      component: (
        <OwnedDonateList
          type='receive'
          userId={detail.id}
          keyParam='projects_belong_to_user_id'
        />
      ),
    },
  ];

  const renderUserRoleMenu = (roles: USER_ROLES) => {
    return (
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-8 w-full'>
        <Tabs
          defaultValue={
            roles === USER_ROLES.USER ? menuUser[0].value : agentUser[0].value
          }
          className='w-full lg:w-2/3 mt-4 lg:mt-6'
        >
          <TabsList className='flex flex-wrap items-center gap-2 justify-start bg-white overflow-x-auto'>
            {roles === USER_ROLES.USER
              ? menuUser.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className='bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full text-sm sm:text-base whitespace-nowrap'
                  >
                    {item.label}
                  </TabsTrigger>
                ))
              : agentUser.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className='bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full text-sm sm:text-base whitespace-nowrap'
                  >
                    {item.label}
                  </TabsTrigger>
                ))}
          </TabsList>

          {roles === USER_ROLES.USER
            ? menuUser.map((item) => (
                <TabsContent key={item.value} value={item.value}>
                  {item.component}
                </TabsContent>
              ))
            : agentUser.map((item) => (
                <TabsContent key={item.value} value={item.value}>
                  {item.component}
                </TabsContent>
              ))}
        </Tabs>
        <div className='w-full lg:w-1/3 mt-4 lg:mt-8'>
          <SummaryInfo summaryInfo={detail} />
        </div>
      </div>
    );
  };

  return renderUserRoleMenu(role);
};

export default UserTab;
