'use client';

import NextLink from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { usePathname } from 'next/navigation';

const navItems = [
  { text: 'Buyer', link: '/buyer' },
  { text: 'Seller', link: '/seller' },
];

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root className='relative z-[1]'>
      <NavigationMenu.List className='m-0 flex w-screen list-none space-x-8 bg-slate-50 px-8 py-2 shadow'>
        {navItems.map((el) => (
          <NavigationMenu.Item key={el.text}>
            <NavigationMenu.Link asChild active={pathname === el.link}>
              <NextLink
                className='text-violet-600 hover:text-slate-500 data-[active]:text-violet-500 data-[active]:underline'
                href={el.link}
              >
                {el.text}
              </NextLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
};
