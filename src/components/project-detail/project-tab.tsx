import React from 'react';
import DOMPurify from 'dompurify';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SummaryCampaign from './summary-campaign';
import DonatedList from './donated-list';
import VolunteerList from './volunteer-list';
import { CAMPAIGN_TYPE } from '@/app/enum';

// const tabList = [
//   { label: 'Câu chuyện', value: 'summary', component: <SummaryCampaign /> },
//   { label: 'Danh sách ủng hộ', value: 'supported', component: <DonatedList /> },
//   { label: 'Danh sách TNV', value: 'vulunteer', component: <VolunteerList /> },
// ];

const ProjectTab = ({ project }: { project: TCampaign }) => {
  const cleanContent = DOMPurify.sanitize(project?.content || '', {
    ADD_TAGS: ['img'],
    ADD_ATTR: ['src', 'alt', 'width', 'height'],
    FORBID_ATTR: ['onerror', 'onload'],
  });

  // Loại bỏ ảnh có src rỗng
  cleanContent.replace(/<Image[^>]*src=["']{1}["'][^>]*>/g, '');

  // Initialize an empty tab list
  let tabList: { label: string; value: string; component: React.ReactNode }[] =
    [];

  // Populate the tab list based on the project type
  if (project?.type === CAMPAIGN_TYPE.DONATE) {
    tabList = [
      {
        label: 'Câu chuyện',
        value: 'summary',
        component: <SummaryCampaign project={project} />,
      },
      {
        label: 'Danh sách ủng hộ',
        value: 'donation',
        component: <DonatedList project={project} />,
      },
    ];
  } else if (project?.type === CAMPAIGN_TYPE.VOLUNTEER) {
    tabList = [
      {
        label: 'Câu chuyện',
        value: 'summary',
        component: <SummaryCampaign project={project} />,
      },
      {
        label: 'Danh sách TNV',
        value: 'volunteer',
        component: <VolunteerList project={project} />,
      },
    ];
  } else if (project?.type === CAMPAIGN_TYPE.MULTIPLE) {
    tabList = [
      {
        label: 'Câu chuyện',
        value: 'summary',
        component: <SummaryCampaign project={project} />,
      },
      {
        label: 'Danh sách ủng hộ',
        value: 'supported',
        component: <DonatedList project={project} />,
      },
      {
        label: 'Danh sách TNV',
        value: 'volunteer',
        component: <VolunteerList project={project} />,
      },
    ];
  }

  return (
    <Tabs defaultValue='summary' className='w-full mt-6'>
      <TabsList className='flex items-center gap-2 justify-start bg-white'>
        {tabList.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className='bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full'
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabList.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProjectTab;
