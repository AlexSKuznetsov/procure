'use client';

import axios from 'axios';
import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { CompanySelect } from './CompanySelect';
import { navItems } from '@/lib/constants';

export const NavBar = () => {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ['companies'],
    queryFn: () => axios.get('api'),
  });

  return (
    <NavigationMenu.Root className='relative z-[1]'>
      <NavigationMenu.List className='m-0 flex w-screen list-none justify-center space-x-6 bg-slate-50 px-8 py-2 shadow'>
        {navItems.map(({ text, link }) => (
          <NavigationMenu.Item key={text}>
            <NavigationMenu.Link asChild active={pathname === link}>
              <NextLink
                className='p-2 text-gray-700 hover:bg-blue-100 hover:text-white data-[active]:border-b-4 data-[active]:border-blue-600 data-[active]:text-blue-700'
                href={link}
              >
                {text}
              </NextLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
        {data && <CompanySelect companies={data.data.companies} />}
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
};
