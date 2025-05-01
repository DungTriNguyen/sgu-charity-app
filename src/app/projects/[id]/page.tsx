import ProjectDetail from '@/components/project-detail';
import React, { use } from 'react';
import Head from 'next/head';

const ProjectDetailPage = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const { id } = params;

  // Fetch or define the project object
  const project = {
    name: 'Default Project Name',
    slug: 'default-project-slug',
    content: 'Default project description',
    background_image: '/default-image.jpg',
  };

  return (
    <>
      <Head>
        <title>{project.name}</title>
        <meta property='og:title' content={project.slug} />
        <meta
          property='og:description'
          content={project.content || undefined}
        />
        <meta property='og:image' content={project.background_image} />
        <meta
          property='og:url'
          content={`${baseUrl}/projects/${project?.slug}`}
        />
        <meta property='og:type' content='article' />
      </Head>
      <ProjectDetail project_id={id} />
    </>
  );
};

export default ProjectDetailPage;
