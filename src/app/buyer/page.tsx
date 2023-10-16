'use client';

import { CreateLot } from '@/components/LotsModal/CreateModal';
import { LotList } from '@/components/LotList';
import { PageHeader } from '@/components/PageHeader';
import { useCompanyStore } from '@/store/store';
import { useGetBuyerData } from './hooks';

const Byuer = () => {
  const { companyId } = useCompanyStore();
  const { lots } = useGetBuyerData(companyId);

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='flex items-center justify-center gap-2 pt-2'>
        <PageHeader text='Buyer page' />
      </div>

      <div className='mt-4 flex flex-col items-center space-y-2'>
        <div className='flex w-[410px] items-end justify-between pt-2'>
          <div className='text-md flex items-center justify-center text-yellow-500'>
            <h2 className='mr-2'>Total lots count:</h2>
            <div className='rounded-xl border px-2 text-sm text-white'>{lots?.length}</div>
          </div>
          {companyId && <CreateLot />}
        </div>
        {lots && lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Byuer;
