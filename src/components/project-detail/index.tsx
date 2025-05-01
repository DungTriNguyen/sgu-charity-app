'use client';
import React from 'react';
import ProjectSwiper from './project-swiper';
import ProjectTab from './project-tab';

import ProjectStatus from './project-status';
import ProjectContact from './project-contact';
import ProjectProcessing from './project-processing';
import { useGetProjectByID } from '@/hooks/use-project';

const ProjectDetail = ({ project_id }: { project_id: string }) => {
  const { data: projectById } = useGetProjectByID({ slug: project_id });

  const project = projectById?.data?.[0];

  return project ? (
    <div className='flex-col w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto flex flex-col lg:flex-row gap-4 lg:gap-8 my-4 lg:my-8'>
        <div className='w-full lg:w-3/5'>
          <h3 className='font-bold text-xl sm:text-2xl mb-4'>{project.name}</h3>
          <ProjectSwiper project={project} />
          <ProjectTab project={project} />
        </div>
        <div className='w-full lg:w-2/5 flex flex-col gap-4'>
          <ProjectStatus project={project} />
          <ProjectContact project={project} />
        </div>
      </div>
      <div className='mt-10 lg:mt-20'>
        <ProjectProcessing />
      </div>
    </div>
  ) : null;
};

export default ProjectDetail;
