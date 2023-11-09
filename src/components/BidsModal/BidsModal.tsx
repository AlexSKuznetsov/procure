'use client';

import { useState, useMemo, useCallback } from 'react';
import { Cross1Icon, BackpackIcon, CheckboxIcon, BoxIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import {
  Table,
  HoverCard,
  Box,
  Text,
  Dialog,
  DialogClose,
  Button,
  IconButton,
} from '@radix-ui/themes';
import { OffersType } from '@/types/offers';
import { Tooltip } from '@/components/Tooltip';
import { handleBidPick } from '@/lib/actions';
import { QueryKeys } from '@/lib/constants';
import { queryClient } from '@/components/QueryProvider';
import { format } from 'date-fns';

type PropsType = {
  offers: OffersType[];
  lotStatus: string;
  lotId: string;
  winnerOfferId: string | null;
};

export const BidsModal = ({ offers, lotStatus, lotId, winnerOfferId }: PropsType) => {
  const [open, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [bidId, setBidId] = useState<string | null>(null);

  const getFormattedCurrency = useMemo(
    () => (number: string) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(parseFloat(number)),
    [],
  );

  const onBidPick = async () => {
    if (bidId) {
      setIsUpdating(true);
      await handleBidPick(lotId, bidId);

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BUYER_PAGE] });
        setIsUpdating(false);
        setIsOpen(false);
      }, 1000);
    }
  };

  const renderTableHeader = useMemo(() => {
    return (
      <>
        <Table.Header>
          <Table.Row>
            {['Company', 'Price', 'Description', 'Date', 'Action'].map((item) => (
              <Table.ColumnHeaderCell key={item} align='center'>
                <span className='text-xs'>{item}</span>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
      </>
    );
  }, []);

  const renderTableBody = useCallback(() => {
    return (
      <Table.Body>
        {offers.map((item) => (
          <Table.Row key={item.id} align='center' className='h-6'>
            <Table.RowHeaderCell className='text-xs text-gray-500' align='center'>
              {item.company.name}
            </Table.RowHeaderCell>
            <Table.Cell className='text-xs text-gray-500' align='center'>
              {getFormattedCurrency(item.price as unknown as string)}
            </Table.Cell>
            <Table.Cell align='center'>{renderDescriptionField(item.description)}</Table.Cell>
            <Table.Cell align='center' className='text-xs text-gray-500'>
              {format(new Date(item.createdAt as unknown as string), 'MM/dd/yyyy HH:mm')}
            </Table.Cell>
            <Table.Cell align='center'>
              {lotStatus !== 'terminated' && lotStatus !== 'finished' && (
                <button className='group flex items-center' onClick={() => setBidId(item.id)}>
                  {bidId === item.id ? (
                    <CheckboxIcon className='text-green-600' />
                  ) : (
                    <Tooltip content='Pick offer'>
                      <BoxIcon className='h-3 text-gray-500 group-hover:text-green-600' />
                    </Tooltip>
                  )}
                </button>
              )}
              {lotStatus === 'finished' && item.id === winnerOfferId && (
                <Tooltip content='Winner'>
                  <CheckboxIcon className='text-green-600' />
                </Tooltip>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  }, [bidId, offers, lotStatus]);

  const renderDescriptionField = (text: string) => {
    return (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <div className='w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-500'>
            <span className='text-xs'>{text}</span>
          </div>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Box>
            <Text as='div' size='2'>
              {text}
            </Text>
          </Box>
        </HoverCard.Content>
      </HoverCard.Root>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <div className='absolute bottom-[15px] right-[10px] flex cursor-pointer items-center space-x-2 rounded-xl bg-blue-600 px-2 text-white hover:bg-blue-400'>
          <BackpackIcon className='h-3 w-3' />
          <div className='inline-flex h-6 items-center text-xs font-bold'>{offers.length}</div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content>
        <div className='flex items-center justify-between'>
          <Dialog.Title className='text-xl text-gray-50'>Offers list</Dialog.Title>
          <Dialog.Close className='text-gray-400 hover:text-gray-500'>
            <IconButton variant='ghost'>
              <Cross1Icon />
            </IconButton>
          </Dialog.Close>
        </div>

        <p className='my-4 text-xs text-gray-500'>List of offers from companies</p>

        <Table.Root variant='surface'>
          {renderTableHeader}
          {renderTableBody()}
        </Table.Root>

        {lotStatus !== 'terminated' && lotStatus !== 'finished' && (
          <div className='mt-8 space-x-6 text-right'>
            <Dialog.Close className='px-4 py-2 text-sm '>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>

            <Button disabled={Boolean(!bidId)} onClick={onBidPick} variant='solid'>
              Confirm
            </Button>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
