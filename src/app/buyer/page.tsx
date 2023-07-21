import { prisma } from '@/lib/prisma';
import { Lot } from '@/components/Lot';

const Byuer = async () => {
  const lots = await prisma.lot.findMany();

  return (
    <div className='h-[screen-20px]'>
      <h1 className='text-xl text-center mt-2 text-slate-700'>Buyer page</h1>

      <div className='flex flex-col items-center mt-4 space-y-2'>
        <button className='border-2 border-violet-500 rounded px-2 py-1 bg-violet-500 text-white shadow hover:text-slate-200'>
          Create new lot
        </button>
        <h2>Lots list:</h2>
        {lots && lots.map((el) => <Lot key={el.id} {...el} />)}
      </div>
    </div>
  );
};

export default Byuer;
