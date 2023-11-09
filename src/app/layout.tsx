import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from '@/components/Navbar';
import { QueryProvider } from '@/components/QueryProvider';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Procurement App',
  description: 'Procurement App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <html lang='en' className='dark-theme dark' style={{ colorScheme: 'dark' }}>
        <body className={`${inter.variable} bg-slate-900 font-sans`}>
          <NavBar />
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
