'use client';

import { LotList } from '@/components/LotList';
import { PageHeader } from '@/components/PageHeader/PageHeader';
import { useCompanyStore } from '@/store/store';
import { useGetBuyerData } from './hooks';

const Byuer = () => {
  const { companyId } = useCompanyStore();
  const { lots } = useGetBuyerData(companyId);

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='flex items-center justify-center gap-2 pt-2'>
        <PageHeader headerText='Buyer page' lotsCount={lots?.length} />
      </div>

      <div className='mt-4 flex flex-col items-center space-y-2'>
        {lots && lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Byuer;
