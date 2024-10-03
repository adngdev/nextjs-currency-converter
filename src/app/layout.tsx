import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'

import './globals.css';

import ReactQueryProvider from '@/providers/ReactQueryProvider';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Currency Converter App',
  description: 'Currency Converter App',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`w-full h-screen p-5 bg-zinc-800 ${poppins.className} antialiased`}>
        <ReactQueryProvider>
          <div className={`space-y-5`}>
            <p className={`text-lg text-zinc-400`}>Currency Converter</p>
            {children}    
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
