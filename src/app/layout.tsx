import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from '@/components/Navbar';
import { QueryProvider } from '@/components/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Procurement App',
  description: '#',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <html lang='en'>
        <body className={(inter.className, 'bg-slate-900')}>
          <NavBar />
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
