'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import AccountList from './account-list';

const AccountFilter = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const TAB_LIST = useMemo(
    () => [
      {
        label: 'Tổ chức',
        value: 'organization',
      },
      {
        label: 'Cá nhân',
        value: 'individual',
      },
    ],
    []
  );

  const activeTab = useMemo(() => {
    const param = searchParams.get('type');
    if (!param) return TAB_LIST[0].value;
    const type = TAB_LIST.find((item) => item.value === param);
    if (type) return type.value;
    return TAB_LIST[0].value;
  }, [searchParams, TAB_LIST]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const changeTabAction = (param: string) => {
    router.push(`/accounts?type=${param}`);
  };

  return (
    <>
      <div className='container px-4 md:px-6 2xl:max-w-[1200px] mx-auto py-8 md:py-16'>
        <h3 className='text-center font-bold text-2xl md:text-3xl mb-6 md:mb-10'>
          Danh sách cá nhân/ tổ chức gây quỹ
        </h3>
        <div className='flex flex-col md:flex-row gap-4 md:gap-0 pb-8 md:pb-14'>
          <Tabs
            defaultValue={activeTab}
            className='w-full md:w-auto'
            value={activeTab}
            onValueChange={changeTabAction}
          >
            <TabsList className='flex gap-2 md:gap-4 justify-start bg-transparent w-full md:w-auto'>
              {TAB_LIST.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className='flex-1 md:flex-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className='w-full md:w-auto md:ml-auto'>
            <div className='relative w-full md:w-[300px]'>
              <Input
                type='search'
                placeholder='Tìm kiếm'
                className='w-full pr-10'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className='absolute right-4 top-0 bottom-0 m-auto' />
            </div>
          </div>
        </div>
        <AccountList type={activeTab} search={debouncedSearch} />
      </div>
    </>
  );
};

export default AccountFilter;
