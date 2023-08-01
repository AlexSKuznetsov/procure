import { useState } from 'react';
import {
  TimerIcon,
  CrossCircledIcon,
  CalendarIcon,
  IdCardIcon,
  GearIcon,
} from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BidModal } from '@/components/BidModal/BidModal';
import { handleCancel } from '../lib/actions';
import { LotType } from '@/types/lot';
import { useCompanyStore } from '@/store/store';
import { BidsModal } from '@/components/BidsModal/BidsModal';

export const Lot = ({
  id,
  description,
  name,
  duration,
  status,
  lotId,
  page,
  createdAt,
  company,
  offers,
}: LotType & { page: string }) => {
  const { companyId: sellerId } = useCompanyStore();
  const [isLoading, setIsLoading] = useState(false);

  const isInProgress = status === 'in progress';
  const startDate = new Date(createdAt).toLocaleString();

  return (
    <Card className='relative m-2 w-[400px] bg-white shadow'>
      <CardHeader>
        <CardTitle className='pointer-events-none flex items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <span className=' text-gray-500'>Lot: {id}</span>
          </div>
          <div>
            {status === 'finished' && (
              <span className='rounded  border border-green-600  p-1 px-2 text-xs  text-green-600 shadow'>
                completed
              </span>
            )}
            {status === 'in progress' && (
              <span className='rounded border border-blue-500 p-1 px-2 text-xs text-blue-500 shadow '>
                in progress
              </span>
            )}
            {status === 'terminated' && (
              <span className='rounded border border-red-400 p-1 px-2 text-xs text-red-400 shadow'>
                canceled
              </span>
            )}
          </div>
        </CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-700'>{description}</p>
      </CardContent>
      <CardFooter>
        <div className='flex w-full flex-col space-y-1 text-gray-500'>
          <div className='flex  space-x-2'>
            <IdCardIcon />
            <p className='text-xs'>{company.name}</p>
          </div>

          <div className='flex items-center space-x-2'>
            <CalendarIcon />
            <p className='text-xs'>{startDate}</p>
          </div>
          <div className='flex items-center space-x-2'>
            <TimerIcon />
            <p className='text-xs'>{duration}</p>
          </div>

          <div className='flex items-center'>
            <div className='flex items-center space-x-2'>
              <GearIcon />
              <p className='text-xs text-gray-400'>{lotId}</p>
            </div>
          </div>
        </div>
        <div className='pb-[50px]'>
          <div>
            {isInProgress && !isLoading && page.toLowerCase() !== '/seller' && (
              <div
                className='group flex cursor-pointer items-center space-x-1 rounded border border-gray-400 p-1 group-hover:border-red-500'
                onClick={async () => {
                  setIsLoading(true);
                  await handleCancel(lotId);
                  setIsLoading(false);
                }}
              >
                <CrossCircledIcon className='text-gray-400 group-hover:text-red-600' />
                <span className='text-xs text-gray-400 group-hover:text-red-500'>cancel</span>
              </div>
            )}
            {page.toLowerCase() === '/seller' && sellerId && (
              <BidModal sellerId={sellerId} lotId={lotId} lotNumber={id} />
            )}
          </div>
        </div>
      </CardFooter>
      {offers && offers.length > 0 && <BidsModal offers={offers} />}
    </Card>
  );
};
