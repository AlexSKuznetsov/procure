import { TimerIcon, CalendarIcon, IdCardIcon, GearIcon } from '@radix-ui/react-icons';
import { Tooltip } from '@/components/Tooltip';

type PropsType = {
  companyName: string;
  startDate: string;
  duration: string;
  lotId: string;
};

export const LotInfo = ({ companyName, startDate, duration, lotId }: PropsType) => {
  return (
    <div className='flex w-full flex-col space-y-1 text-gray-500'>
      <div className='flex  space-x-2'>
        <Tooltip content='Company'>
          <IdCardIcon />
        </Tooltip>
        <p className='text-xs'>{companyName}</p>
      </div>

      <div className='flex items-center space-x-2'>
        <Tooltip content='Start date'>
          <CalendarIcon />
        </Tooltip>
        <p className='text-xs'>{startDate}</p>
      </div>
      <div className='flex items-center space-x-2'>
        <Tooltip content='Elapsed time'>
          <TimerIcon />
        </Tooltip>
        <p className='text-xs'>{duration}</p>
      </div>

      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <Tooltip content='Workflow ID'>
            <GearIcon />
          </Tooltip>
          <p className='text-[10px] text-gray-400'>{lotId}</p>
        </div>
      </div>
    </div>
  );
};
