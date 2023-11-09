'use client';

import { useState } from 'react';
import { Dialog, IconButton } from '@radix-ui/themes';
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
      <Dialog.Trigger>
        <div className='flex cursor-pointer space-x-2 rounded border border-amber-600 px-2 py-0.5 text-amber-600 shadow hover:bg-gray-100'>
          <RocketIcon />
          <span className='text-xs'>bid</span>
        </div>
      </Dialog.Trigger>

      <Dialog.Content>
        <div className='flex items-center justify-between'>
          <Dialog.Title className='text-xl text-gray-100'>Create new bid</Dialog.Title>
          <Dialog.Close className='text-gray-400 hover:text-gray-500'>
            <IconButton variant='ghost'>
              <Cross1Icon />
            </IconButton>
          </Dialog.Close>
        </div>

        <BidForm setIsOpen={setIsOpen} sellerId={sellerId} lotId={lotId} lotNumber={lotNumber} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
