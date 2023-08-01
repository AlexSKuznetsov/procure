'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon, RocketIcon } from '@radix-ui/react-icons';
import { Offer } from 'prisma/prisma-client';
import { Spinner } from '../Spinner';

type PropsType = {
  offers: Offer[];
};

export const BidsModal = ({ offers }: PropsType) => {
  const [open, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className='absolute right-[10px] top-[175px] cursor-pointer rounded-full border border-gray-200 bg-red-400 px-3 py-1 text-xs font-bold text-white shadow hover:bg-slate-50 hover:text-gray-700'>
          {offers.length}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50'>
          <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded bg-white p-8 text-gray-900 shadow'>
            <div className='flex items-center justify-between'>
              <Dialog.Title className='text-xl text-gray-800'>Offers list</Dialog.Title>
              <Dialog.Close className='text-gray-400 hover:text-gray-500'>
                <Cross1Icon />
              </Dialog.Close>
            </div>
            <p className='my-4 text-xs font-thin text-gray-500'>
              List of offers from defferent companies
            </p>

            {/* <div className='grid grid-cols-4 gap-1'> */}
            {offers.map((bid) => (
              <div
                key={bid.id}
                className='grid grid-cols-[180px_50px_50px_150px_60px] items-center gap-1 py-1 text-xs text-gray-500'
              >
                <div className=''>{bid.companyId}</div>
                <div>{bid.price as unknown as string}</div>
                <div>{bid.condition}</div>
                <div className='justify-self-end'>{bid.description}</div>
                <button className='rounded bg-green-500 px-2 py-1 text-white shadow'>winner</button>
              </div>
            ))}
            {/* </div> */}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
