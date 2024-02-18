import { Card, TextField, IconButton, Badge, Theme } from '@radix-ui/themes';
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { CreateLot } from '../LotsModal/CreateModal';
import { useCompanyStore } from '@/store/store';

type PropsType = {
  headerText: string;
  lotsCount: number | undefined;
};

export const PageHeader = ({ headerText, lotsCount }: PropsType) => {
  const { companyId } = useCompanyStore();

  return (
    <Theme panelBackground='translucent' radius='small' appearance='dark'>
      <Card>
        <p className='text-md pb-2 font-semibold text-white'>{headerText}</p>
        <div className='px-1'>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height='16' width='16' />
            </TextField.Slot>
            <TextField.Input placeholder='Search by lot name' radius='medium' />
          </TextField.Root>
        </div>

        <div className='flex w-[440px] items-end justify-between pt-2'>
          <div className='flex items-center justify-center text-sm text-yellow-500'>
            <h2 className='mr-2'>Total lots count:</h2>
            <Badge variant='outline' highContrast color='yellow'>
              {lotsCount || 0}
            </Badge>
          </div>
          {companyId && (
            <div className='flex items-center gap-4'>
              <IconButton type='button' variant='ghost' color='blue' asChild>
                <MixerHorizontalIcon className='cursor-pointer' />
              </IconButton>
              <CreateLot />
            </div>
          )}
        </div>
      </Card>
    </Theme>
  );
};
