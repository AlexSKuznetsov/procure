'use client';

import { CreateLot } from '@/components/LotsModal/CreateModal';
import { LotList } from '@/components/LotList';
import { PageHeader } from '@/components/PageHeader';
import { useCompanyStore } from '@/store/store';
import { useGetBuyerData } from './hooks';

const Byuer = () => {
  const { companyId, companyName } = useCompanyStore();
  const { lots } = useGetBuyerData(companyId);

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='flex items-center justify-center gap-2 pt-2'>
        <PageHeader text='Buyer page' />
        <span className='text-xl font-semibold text-blue-600'>{companyName}</span>
      </div>

      <div className='mt-4 flex flex-col items-center space-y-2'>
        <div className='flex w-[380px] items-end justify-between pt-2'>
          <h2 className='text-md text-yellow-500'>Lots list:</h2>
          {companyId && <CreateLot />}
        </div>
        {lots && lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Byuer;
