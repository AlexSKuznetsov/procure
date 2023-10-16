'use client';

import { PageHeader } from '@/components/PageHeader';
import { LotList } from '@/components/LotList';
import { useCompanyStore } from '@/store/store';
import { useGetSellerData } from './hooks';

const Seller = () => {
  const { companyId, companyName } = useCompanyStore();
  const { lots } = useGetSellerData(companyId);

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='flex items-center justify-center gap-2 pt-2'>
        <PageHeader text='Seller page' />
      </div>

      <div className='mt-4 flex flex-col items-center space-y-2'>
        <div className='mt-2 text-yellow-500'>
          {lots && lots.length > 0 ? (
            <span>List of active lots:</span>
          ) : (
            <span>There are no lots available for your Company right now</span>
          )}
        </div>
        {lots && lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Seller;
