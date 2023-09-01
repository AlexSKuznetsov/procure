export const LotStatus = ({ status }: { status: string }) => {
  if (status === 'finished') {
    return (
      <span className='rounded border border-green-600  p-1 px-2 text-[10px] uppercase text-green-600'>
        completed
      </span>
    );
  }

  if (status === 'in progress') {
    return (
      <span className='rounded border border-blue-500 p-1 px-2 text-[10px] uppercase text-blue-500'>
        in progress
      </span>
    );
  }

  if (status === 'terminated') {
    return (
      <span className='rounded border border-red-500 p-1 px-2 text-[10px] uppercase text-red-500'>
        canceled
      </span>
    );
  }
};
