'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon, RocketIcon } from '@radix-ui/react-icons';
import { BidForm } from '@/components/BidModal/BidForm';

type PropsType = {
  sellerId: string;
  lotId: string;
  lotNumber: number;
};

export const BidModal = ({ sellerId, lotId, lotNumber }: PropsType) => {
  const [open, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className='flex cursor-pointer space-x-2 rounded border border-amber-500 px-2 py-0.5 text-amber-500 shadow hover:bg-gray-100'>
          <RocketIcon />
          <span className='text-xs'>bid</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50'>
          <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-8 text-gray-900 shadow'>
            <div className='flex items-center justify-between'>
              <Dialog.Title className='text-xl text-gray-800'>Create new bid</Dialog.Title>
              <Dialog.Close className='text-gray-400 hover:text-gray-500'>
                <Cross1Icon />
              </Dialog.Close>
            </div>

            <BidForm
              setIsOpen={setIsOpen}
              sellerId={sellerId}
              lotId={lotId}
              lotNumber={lotNumber}
            />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
