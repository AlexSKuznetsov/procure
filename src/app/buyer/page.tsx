import { prisma } from '@/lib/prisma';
import { CreateLot } from '@/components/CreateModal';
import { LotList } from '@/components/LotList';

const Byuer = async () => {
  const lots = await prisma.lot.findMany({ orderBy: { id: 'desc' } });

  return (
    <div className="h-[screen-20px]">
      <h1 className="mt-2 text-center text-xl text-white">Buyer page</h1>

      <div className="mt-4 flex flex-col items-center space-y-2">
        <div className="flex w-[420px] items-end justify-between ">
          <h2 className="text-sm text-white">Lots list:</h2>
          <CreateLot />
        </div>
        <LotList lots={lots} />
      </div>
    </div>
  );
};

export default Byuer;
