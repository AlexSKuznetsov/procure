import React from 'react';
import * as Tooltiplib from '@radix-ui/react-tooltip';

export function Tooltip({
  children,
  content,
  ...props
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <Tooltiplib.Provider delayDuration={100} skipDelayDuration={500}>
      <Tooltiplib.Root>
        <Tooltiplib.Trigger asChild>{children}</Tooltiplib.Trigger>
        <Tooltiplib.Portal>
          <Tooltiplib.Content
            side='top'
            align='center'
            {...props}
            className='rounded bg-gray-800 px-2 py-1 text-xs text-gray-50'
            sideOffset={2}
          >
            {content}
            <Tooltiplib.Arrow width={11} height={5} />
          </Tooltiplib.Content>
        </Tooltiplib.Portal>
      </Tooltiplib.Root>
    </Tooltiplib.Provider>
  );
}
