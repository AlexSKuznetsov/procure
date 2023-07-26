import { prisma } from '@/lib/prisma';
import { CreateLot } from '@/components/CreateModal';
import { LotList } from '@/components/LotList';
import { PageHeader } from '@/components/PageHeader';

const Byuer = async () => {
  const lots = await prisma.lot.findMany({ orderBy: { id: 'desc' } });

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <PageHeader text='Buyer page' />

      <div className='mt-4 flex flex-col items-center space-y-2'>
        <div className='flex w-[420px] items-end justify-between '>
          <h2 className='text-sm text-white'>Lots list:</h2>
          <CreateLot />
        </div>
        {lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Byuer;
