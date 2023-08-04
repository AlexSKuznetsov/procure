export const LotStatus = ({ status }: { status: string }) => {
  if (status === 'finished') {
    return (
      <span className='rounded  border border-green-600  p-1 px-2 text-xs  text-green-600 shadow'>
        completed
      </span>
    );
  }

  if (status === 'in progress') {
    return (
      <span className='rounded border border-blue-500 p-1 px-2 text-xs text-blue-500 shadow '>
        in progress
      </span>
    );
  }

  if (status === 'terminated') {
    return (
      <span className='rounded border border-red-400 p-1 px-2 text-xs text-red-400 shadow'>
        canceled
      </span>
    );
  }
};
