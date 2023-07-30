import { useState } from 'react';
import {
  TimerIcon,
  InfoCircledIcon,
  CrossCircledIcon,
  CalendarIcon,
  IdCardIcon,
} from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BidModal } from '@/components/BidModal/BidModal';
import { handleCancel } from '../lib/actions';
import { LotType } from '@/types/lot';
import { useCompanyStore } from '@/store/store';

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
}: LotType & { page: string }) => {
  const { companyId: sellerId } = useCompanyStore();
  const [isLoading, setIsLoading] = useState(false);

  const isInProgress = status === 'in progress';
  const startDate = new Date(createdAt).toLocaleString();

  return (
    <Card className='m-2 w-[400px] bg-white shadow'>
      <CardHeader>
        <CardTitle className='pointer-events-none flex items-center justify-between'>
          <span className='text-xl'>Lot: {id}</span>
          <div>
            {status === 'finished' && (
              <span className='rounded  border border-green-600  p-1 px-2 text-xs text-green-600 shadow'>
                completed
              </span>
            )}
            {status === 'in progress' && (
              <span className='rounded border border-blue-500 p-1 px-2 text-xs text-blue-500 shadow'>
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
        <div className='flex w-full flex-col space-y-2 text-gray-500'>
          {page === '/seller' && (
            <div className='flex items-center space-x-2'>
              <IdCardIcon />
              <p className='text-xs'>{company.name}</p>
            </div>
          )}
          <div className='flex items-center space-x-2'>
            <CalendarIcon />
            <p className='text-xs'>{startDate}</p>
          </div>
          <div className='flex items-center space-x-2'>
            <TimerIcon />
            <p className='text-xs'>{duration}</p>
          </div>

          <div className='group flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <InfoCircledIcon />
              <p className='text-xs text-gray-400'>{lotId}</p>
            </div>
            {isInProgress && !isLoading && page.toLowerCase() !== '/seller' && (
              <div
                className='flex cursor-pointer items-center space-x-1 rounded border border-gray-400 p-1 group-hover:border-red-500'
                onClick={async () => {
                  setIsLoading(true);
                  await handleCancel(lotId);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 2000);
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
    </Card>
  );
};
