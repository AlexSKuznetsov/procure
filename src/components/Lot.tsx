import { useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BidModal } from '@/components/BidModal/BidModal';
import { Tooltip } from '@/components/Tooltip';
import { handleCancel } from '@/lib/actions';
import { LotType } from '@/types/lot';
import { useCompanyStore } from '@/store/store';
import { BidsModal } from '@/components/BidsModal/BidsModal';
import { LotStatus } from '@/components/LotStatus';
import { LotInfo } from '@/components/LotInfo';
import { calculateEstimateEndDate } from '@/lib/utils';
import { QueryKeys } from '@/lib/constants';
import { queryClient } from '@/components/QueryProvider';

type PropsType = LotType & { page: string };

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
  winnerOfferId,
}: PropsType) => {
  const { companyId: sellerId } = useCompanyStore();
  const [isLoading, setIsLoading] = useState(false);

  const isInProgress = status === 'in progress';
  const isFinished = status === 'finished' || status === 'terminated';
  const startDate = new Date(createdAt).toLocaleString();

  const ends = calculateEstimateEndDate(createdAt as unknown as string, duration);

  return (
    <Card className='relative m-2 min-w-[400px] max-w-md bg-white shadow'>
      <CardHeader>
        <CardTitle className='pointer-events-none flex items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <span className='text-gray-500'>Lot: {id}</span>
          </div>
          <div>
            <LotStatus status={status} />
          </div>
        </CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-xs text-gray-600'>{description}</p>
      </CardContent>
      <CardFooter>
        <LotInfo
          companyName={company.name}
          duration={isFinished ? '-' : ends}
          lotId={lotId}
          startDate={startDate}
        />
        <div className='pb-[50px]'>
          <div>
            {isInProgress && !isLoading && page.toLowerCase() !== '/seller' && (
              <Tooltip content='Terminate lot'>
                <div
                  className='group flex cursor-pointer items-center space-x-1 rounded border border-red-500 p-0.5 px-1 hover:bg-slate-100'
                  onClick={async () => {
                    setIsLoading(true);
                    await handleCancel(lotId);

                    setTimeout(() => {
                      queryClient.invalidateQueries({ queryKey: [QueryKeys.BUYER_PAGE] });
                      setIsLoading(false);
                    }, 1000);
                  }}
                >
                  <Cross2Icon className='h-3 w-3 text-red-600' />
                  <span className='text-xs text-red-600'>cancel</span>
                </div>
              </Tooltip>
            )}
            {page.toLowerCase() === '/seller' && sellerId && (
              <BidModal sellerId={sellerId} lotId={lotId} lotNumber={id} />
            )}
          </div>
        </div>
      </CardFooter>
      {offers && offers.length > 0 && (
        <BidsModal offers={offers} lotStatus={status} lotId={lotId} winnerOfferId={winnerOfferId} />
      )}
    </Card>
  );
};
