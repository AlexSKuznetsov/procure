'use client';

import { LotList } from '@/components/LotList';
import { useCompanyStore } from '@/store/store';
import { useGetSellerData } from './hooks';

const Seller = () => {
  const { companyId } = useCompanyStore();
  const { lots } = useGetSellerData(companyId);

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='mt-4 flex flex-col items-center space-y-2'>
        <div className='mt-2 text-yellow-500'>
          {lots && lots.length > 0 ? (
            <div className='flex items-center'>
              <span>Active lots count:</span>
              <span className='ml-2 rounded-xl border px-2 text-sm text-white'>{lots?.length}</span>
            </div>
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
