import { Dispatch, FormEvent, SetStateAction } from 'react';
import * as Label from '@radix-ui/react-label';
import * as Dialog from '@radix-ui/react-dialog';
import { handleSubmit } from '@/lib/actions';
import { LotType } from '@/types/lot';

type PropsType = {
  handleClose: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  companyId: string | undefined;
};

export const CreateForm = ({ handleClose, setIsLoading, companyId }: PropsType) => {
  const handleCreateLot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as Iterable<[LotType, FormDataEntryValue]>;
    const requestData: LotType = Object.fromEntries(formData);

    await handleSubmit(requestData, companyId as string);
    handleClose();
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleCreateLot}>
      <LotFields />
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

const LotFields = () => {
  return (
    <div className='mt-4 space-y-4'>
      <div>
        <Label.Root className='whitespace-nowrap text-sm font-medium text-gray-800' htmlFor='name'>
          Name
        </Label.Root>
        <input
          autoFocus
          className='w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm'
          type='text'
          placeholder='Lot name'
          id='name'
          name='name'
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
          placeholder='Lot description'
          id='description'
          name='description'
        />
      </div>

      <div>
        <Label.Root
          className='col-span-1 whitespace-nowrap text-sm font-medium text-gray-800'
          htmlFor='duration'
        >
          Duration
        </Label.Root>
        <input
          className='w-full rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm'
          type='text'
          placeholder='30 days; 1 day; 1 hour'
          id='duration'
          name='duration'
        />
      </div>
    </div>
  );
};