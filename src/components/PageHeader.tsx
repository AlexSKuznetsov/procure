'use client';

import { useCompanyStore } from '@/store/store';

export const PageHeader = ({ text }: { text: string }) => {
  const { companyName } = useCompanyStore();

  return (
    <h1 className='mt-2 text-center text-xl font-bold text-white'>
      {text}: <span className='text-violet-500'>{companyName && companyName}</span>
    </h1>
  );
};
