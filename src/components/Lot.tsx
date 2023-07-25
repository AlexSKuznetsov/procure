import { Lot as LotType } from '@prisma/client';
import { TimerIcon, InfoCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { handleCancel, revalidate } from '../lib/actions';
import { useState } from 'react';

export const Lot = ({ id, description, name, duration, status, lotId }: LotType) => {
  const isInProgress = status === 'in progress';
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className='m-2 w-[400px] bg-white shadow'>
      <CardHeader>
        <CardTitle className='pointer-events-none flex items-center justify-between'>
          <span className='text-xl'>Lot: {id}</span>
          <span>
            {status === 'finished' && (
              <span className='rounded bg-green-400 p-1 px-2 text-sm uppercase text-white shadow'>
                finished
              </span>
            )}
            {status === 'in progress' && (
              <span className='rounded bg-violet-400 p-1 px-2 text-sm uppercase text-slate-800 shadow'>
                in progress
              </span>
            )}
            {status === 'terminated' && (
              <span className='rounded bg-red-400 p-1 px-2 text-sm uppercase text-black shadow'>
                terminated
              </span>
            )}
          </span>
        </CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-700'>{description}</p>
      </CardContent>
      <CardFooter>
        <div className='flex w-full flex-col space-y-2 text-gray-500'>
          <div className='flex items-center space-x-2'>
            <TimerIcon />
            <p className='text-sm'>{duration}</p>
          </div>

          <div className='group flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <InfoCircledIcon />
              <p className='text-xs'>{lotId}</p>
            </div>
            {isInProgress && !isLoading && (
              <div
                className='flex cursor-pointer items-center space-x-1 rounded border border-gray-500 p-1 group-hover:border-red-500'
                onClick={async () => {
                  setIsLoading(true);
                  await handleCancel(lotId);
                  setTimeout(async () => {
                    revalidate('/buyer');
                    setIsLoading(false);
                  }, 2000);
                }}
              >
                <CrossCircledIcon className='text-gray-500 group-hover:text-red-600' />
                <span className='text-xs group-hover:text-red-500'>cancel</span>
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
