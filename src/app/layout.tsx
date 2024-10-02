import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import { QueryClient } from "@tanstack/react-query";

import "./globals.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Currency Converter App",
  description: "Currency Converter App",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <div>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
