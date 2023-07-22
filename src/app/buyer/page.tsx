import { prisma } from '@/lib/prisma';
import { Lot } from '@/components/Lot';
import { CreateLot } from '@/components/CreateModal';

const Byuer = async () => {
  const lots = await prisma.lot.findMany();

  return (
    <div className="h-[screen-20px]">
      <h1 className="mt-2 text-center text-xl text-slate-700">Buyer page</h1>

      <div className="mt-4 flex flex-col items-center space-y-2">
        <CreateLot />
        <h2>Lots list:</h2>
        {lots && lots.map((el) => <Lot key={el.id} {...el} />)}
      </div>
    </div>
  );
};

export default Byuer;
