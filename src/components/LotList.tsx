'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Lot as LotType } from 'prisma/prisma-client';
import { Lot } from './Lot';

export const LotList = ({ lots }: { lots: LotType[] }) => {
  return (
    <ScrollArea.Root className="h-[700px] w-[420px] overflow-hidden rounded bg-white">
      <ScrollArea.Viewport className="h-full w-full rounded">
        {lots && lots.map((el) => <Lot key={el.id} {...el} />)}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="duration-[160ms] bg-gray-white flex touch-none select-none p-0.5 transition-colors ease-out hover:bg-purple-500 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-50 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};
