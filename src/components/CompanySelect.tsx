'use client';

import React from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Company } from 'prisma/prisma-client';
import { useCompanyStore } from '../store/store';

export const CompanySelect = ({ companies }: { companies: Company[] }) => {
  const { companyName, setCompanyName, setCompanyId } = useCompanyStore();

  const onChange = (value: string) => {
    const id = companies.find((c) => c.name === value)?.id;
    setCompanyName(value);
    setCompanyId(id);
  };

  return (
    <Select.Root onValueChange={onChange} value={companyName}>
      <Select.Trigger className='inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet-500 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-violet-100 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet-600'>
        <Select.Value placeholder='Select a company'>{companyName}</Select.Value>
        <Select.Icon className='text-violet-500'>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          sideOffset={5}
          className='overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]'
        >
          <Select.ScrollUpButton className='flex h-[25px] cursor-default items-center justify-center bg-white text-gray-600'>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className='p-[5px]'>
            <Select.Group>
              <Select.Label className='px-[25px] text-xs leading-[25px] text-gray-400'>
                Companies
              </Select.Label>
              {companies.map(({ name, id }) => (
                <Select.Item
                  value={name}
                  key={id}
                  className='relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-gray-700 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-300 data-[disabled]:text-gray-600 data-[highlighted]:text-gray-700 data-[highlighted]:outline-none'
                >
                  <Select.ItemText>{name}</Select.ItemText>
                  <Select.ItemIndicator className='absolute left-0 inline-flex w-[25px] items-center justify-center'>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className='flex h-[25px] cursor-default items-center justify-center bg-white text-violet-500'>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
