'use client';

import { useState, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon, BackpackIcon } from '@radix-ui/react-icons';
import { OffersType } from '@/types/offers';
import { handleBidPick } from '@/lib/actions';
import { QueryKeys } from '@/lib/constants';
import { queryClient } from '@/components/QueryProvider';

type PropsType = {
  offers: OffersType[];
  lotStatus: string;
  lotId: string;
};

export const BidsModal = ({ offers, lotStatus, lotId }: PropsType) => {
  const [open, setIsOpen] = useState(false);

  const getFormattedCurrency = useMemo(
    () => (number: string) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(parseFloat(number)),
    [],
  );

  const onBidPick = (bidId: string) => {
    handleBidPick(lotId, bidId);

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BUYER_PAGE] });
    }, 1000);

    setIsOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className='absolute bottom-[15px] right-[10px] flex cursor-pointer items-center space-x-2 rounded-xl bg-blue-600 px-2 text-white hover:bg-blue-400'>
          <BackpackIcon className='h-3 w-3' />
          <div className='inline-flex h-6 items-center text-xs font-bold'>{offers.length}</div>
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
                className='grid grid-cols-[70px_50px_60px_110px_80px] items-center gap-2 py-1 text-xs text-gray-500 hover:bg-slate-200'
              >
                <div className='text-gray-700'>{bid.company.name}</div>
                <div className='justify-self-end'>
                  {getFormattedCurrency(bid.price as unknown as string)}
                </div>
                <div className='justify-self-end'>{bid.condition}</div>
                <div className='justify-self-end'>{bid.description}</div>
                {lotStatus !== 'terminated' && lotStatus !== 'finished' && (
                  <button
                    className='flex w-[50px] rounded bg-gray-400 py-1 text-white shadow hover:bg-green-500'
                    onClick={() => onBidPick(bid.id)}
                  >
                    <span className='pl-3'>pick</span>
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
