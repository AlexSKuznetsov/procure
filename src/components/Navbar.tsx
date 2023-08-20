'use client';

import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { usePathname } from 'next/navigation';
import { CompanySelect } from './CompanySelect';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const navItems = [
  { text: 'Home', link: '/' },
  { text: 'Buyer', link: '/buyer' },
  { text: 'Seller', link: '/seller' },
];

export const NavBar = () => {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ['companies'],
    queryFn: () => axios.get('http://localhost:3000/api'),
  });

  return (
    <NavigationMenu.Root className='relative z-[1]'>
      <NavigationMenu.List className='m-0 flex w-screen list-none justify-center space-x-6 bg-slate-50 px-8 py-2 shadow'>
        {navItems.map((el) => (
          <NavigationMenu.Item key={el.text}>
            <NavigationMenu.Link asChild active={pathname === el.link}>
              <NextLink
                className='p-2 text-gray-700 hover:bg-blue-500 hover:text-white data-[active]:border-b-2 data-[active]:border-blue-600 data-[active]:text-blue-700'
                href={el.link}
              >
                {el.text}
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
