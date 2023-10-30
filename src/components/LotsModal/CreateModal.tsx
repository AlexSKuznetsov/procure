'use client';

import { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { useCompanyStore } from '@/store/store';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Spinner } from '../Spinner';
import { CreateForm } from './CreateForm';

export const CreateLot = () => {
  const { companyId } = useCompanyStore();

  const [open, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Trigger className='flex items-center space-x-2 rounded border-2 border-blue-700 bg-gray-800 px-2 py-1 text-white shadow hover:text-slate-300'>
        {isLoading ? <Spinner /> : <PlusIcon />}
        <span>{isLoading ? 'Saving' : 'Create new lot'}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50'>
          <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded bg-white p-8 text-gray-900 shadow'>
            <div className='flex items-center justify-between'>
              <Dialog.Title className='text-xl text-gray-800'>Create a new lot</Dialog.Title>
              <Dialog.Close className='text-gray-400 hover:text-gray-500'>
                <Cross1Icon />
              </Dialog.Close>
            </div>

            {companyId && (
              <CreateForm
                handleClose={handleClose}
                setIsLoading={setIsLoading}
                companyId={companyId}
              />
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
