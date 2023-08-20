import { TimerIcon, CalendarIcon, IdCardIcon, GearIcon } from '@radix-ui/react-icons';

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
        <IdCardIcon />
        <p className='text-xs'>{companyName}</p>
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
  );
};
