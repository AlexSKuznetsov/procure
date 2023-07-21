import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

type PropsType = {
  id: number;
  name: string;
  description: string;
  duration: string;
  isFinished: boolean;
};

export const Lot = ({
  id,
  description,
  name,
  duration,
  isFinished,
}: PropsType) => {
  return (
    <Card className='shadow w-[400px] m-2 bg-white'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          Lot: {id}
          <span>
            {isFinished ? (
              <span className='uppercase bg-violet-400 p-1 px-2 rounded text-sm text-white shadow'>
                finished
              </span>
            ) : (
              <span className='uppercase bg-green-300 p-1 px-2 rounded text-slate-800 text-sm shadow'>
                in progress
              </span>
            )}
          </span>
        </CardTitle>
        <CardDescription className='text-slate-500'>
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
