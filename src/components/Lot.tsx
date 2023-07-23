import { Lot as LotType } from '@prisma/client';
import { TimerIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export const Lot = ({
  id,
  description,
  name,
  duration,
  isFinished,
  lotId,
}: LotType) => {
  return (
    <Card className="m-2 w-[400px] bg-white shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl">Lot: {id}</span>
          <span>
            {isFinished ? (
              <span className="rounded bg-violet-400 p-1 px-2 text-sm uppercase text-white shadow">
                finished
              </span>
            ) : (
              <span className="rounded bg-green-300 p-1 px-2 text-sm uppercase text-slate-800 shadow">
                in progress
              </span>
            )}
          </span>
        </CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col space-y-2 text-gray-500">
          <div className="flex items-center space-x-2">
            <TimerIcon />
            <p className="text-sm">{duration}</p>
          </div>
          <div className="flex items-center space-x-2">
            <InfoCircledIcon />
            <p className="text-xs">{lotId}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
