import { Dispatch, FormEvent, SetStateAction } from 'react';

import * as Label from '@radix-ui/react-label';
import * as Dialog from '@radix-ui/react-dialog';
import { Company } from '@prisma/client';
import { handleAddBid } from '@/lib/actions';

type PropsType = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sellerId: string;
  lotId: string;
  lotNumber: number;
};

export const BidForm = ({ setIsOpen, sellerId, lotId, lotNumber }: PropsType) => {
  const handleCreateBid = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as Iterable<[any, FormDataEntryValue]>;
    const requestData: any = Object.fromEntries(formData);

    console.log(requestData);

    await handleAddBid(lotId, {
      companyId: sellerId,
      condition: requestData.condition,
      description: requestData.description,
      lotId: lotNumber,
      price: requestData.price,
      sellerId: sellerId,
    });

    setIsOpen(false);
  };

  return (
    <form onSubmit={handleCreateBid}>
      <BidFields />
      <div className='mt-8 space-x-6 text-right'>
        <Dialog.Close className='rounded  px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600'>
          Cancel
        </Dialog.Close>
        <button className='rounded bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700'>
          Save
        </button>
      </div>
    </form>
  );
};

const BidFields = () => {
  return (
    <div className='mt-4 space-y-4'>
      <div>
        <Label.Root className='whitespace-nowrap text-sm font-medium text-gray-800' htmlFor='price'>
          Price
        </Label.Root>
        <input
          autoFocus
          className='w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm'
          type='number'
          step='.01'
          placeholder='Price'
          id='price'
          name='price'
        />
      </div>

      <div>
        <Label.Root
          className='whitespace-nowrap text-sm font-medium text-gray-800'
          htmlFor='description'
        >
          Description
        </Label.Root>
        <textarea
          className='w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm'
          placeholder='Bid description'
          id='description'
          name='description'
        />
      </div>

      <div>
        <Label.Root
          className='col-span-1 whitespace-nowrap text-sm font-medium text-gray-800'
          htmlFor='Condition'
        >
          Condition
        </Label.Root>
        <input
          className='w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm'
          type='text'
          placeholder='5 days, 1 month, 6 months'
          id='condition'
          name='condition'
        />
      </div>
    </div>
  );
};
