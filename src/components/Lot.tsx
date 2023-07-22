import { Lot as LotType } from '@prisma/client';
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
}: LotType) => {
  return (
    <Card className="m-2 w-[400px] bg-white shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Lot: {id}
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
        <CardDescription className="text-slate-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>duration: {duration}</p>
      </CardContent>
      <CardFooter>
        <p>name: {name}</p>
      </CardFooter>
    </Card>
  );
};
