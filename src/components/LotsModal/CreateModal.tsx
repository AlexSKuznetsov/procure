'use client';

import { useState } from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
import { useCompanyStore } from '@/store/store';
import { Cross1Icon, FilePlusIcon } from '@radix-ui/react-icons';
import { Button, Dialog, IconButton } from '@radix-ui/themes';
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
      <Dialog.Trigger>
        <Button type='button' variant='outline' color='blue' highContrast asChild>
          <div className='cursor-pointer'>
            {isLoading ? <Spinner /> : <FilePlusIcon />}
            <span className='text-sm'>{isLoading ? 'Saving' : 'New lot'}</span>
          </div>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <div className='flex items-center justify-between'>
          <Dialog.Title className='text-xl text-gray-50'>Create a new lot</Dialog.Title>
          <Dialog.Close className='text-gray-400 hover:text-gray-500'>
            <IconButton variant='ghost'>
              <Cross1Icon />
            </IconButton>
          </Dialog.Close>
        </div>

        {companyId && (
          <CreateForm handleClose={handleClose} setIsLoading={setIsLoading} companyId={companyId} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
