'use client';
import { apiAuth } from '@/services/api-client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useAxiosAuth = () => {
  const session = useSession();

  useEffect(() => {
    const requestInterceptor = apiAuth.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${session?.data?.user?.accessToken}`;
      }
      return config;
    });

    return () => {
      apiAuth.interceptors.request.eject(requestInterceptor);
    };
  }, [session]);
  return apiAuth;
};

export { useAxiosAuth };
