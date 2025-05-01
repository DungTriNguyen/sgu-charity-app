import React from 'react';

const SummaryCampaign = ({ project }: { project: TCampaign }) => {
  return project?.content ? (
    <div
      className='custom-content'
      dangerouslySetInnerHTML={{ __html: project.content }}
    />
  ) : null;
};

export default SummaryCampaign;
