'use client';
import React from 'react';
import ProjectList from './project-list';

import ProjectFilter from './project-filter';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

export const formSchema = z.object({
  keyword: z.string().optional(),
  front_status: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
});

interface ProjectComponentProps {
  initialRole: string | null;
}

const ProjectComponent = ({ initialRole }: ProjectComponentProps) => {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      keyword: '',
      front_status: '',
      type: searchParams.get('type') || '',
      category: searchParams.get('category') || '',
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider {...form}>
      <ProjectFilter />
      <ProjectList initialRole={initialRole} />
    </FormProvider>
  );
};

export default ProjectComponent;
