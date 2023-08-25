'use client';

import { useState, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { OffersType } from '@/types/offers';

type PropsType = {
  offers: OffersType[];
  lotStatus: string;
};

export const BidsModal = ({ offers, lotStatus }: PropsType) => {
  const [open, setIsOpen] = useState(false);

  const getFormattedCurrency = useMemo(
    () => (number: string) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(parseFloat(number)),
    [],
  );

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className='absolute right-[10px] top-[175px] cursor-pointer rounded-full border border-gray-200 bg-blue-500 px-2 py-1 text-[10px] font-bold text-white shadow hover:bg-slate-50 hover:text-gray-700'>
          {offers.length}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50'>
          <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-8 text-gray-900 shadow'>
            <div className='flex items-center justify-between'>
              <Dialog.Title className='text-xl text-gray-800'>Offers list</Dialog.Title>
              <Dialog.Close className='text-gray-400 hover:text-gray-500'>
                <Cross1Icon />
              </Dialog.Close>
            </div>
            <p className='my-4 text-xs text-gray-500'>List of offers from companies</p>

            {offers.map((bid) => (
              <div
                key={bid.id}
                className='grid grid-cols-[70px_50px_60px_120px_80px] items-center gap-2 py-1 text-xs text-gray-500 hover:bg-slate-200'
              >
                <div className='text-gray-700'>{bid.company.name}</div>
                <div className='justify-self-end'>
                  {getFormattedCurrency(bid.price as unknown as string)}
                </div>
                <div className='justify-self-end'>{bid.condition}</div>
                <div className='justify-self-end'>{bid.description}</div>
                {lotStatus !== 'terminated' && (
                  <button className='w-[50px] rounded bg-green-600 py-1 text-white shadow'>
                    pick
                  </button>
                )}
              </div>
            ))}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};