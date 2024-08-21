import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'app name',
  robots: {
    index: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen h-auto">
        <menu className="no-print flex flex-col gap-4 p-8 bg-gray-200">
          <Link href="/" className="text-xl font-bold mb-4">
            Home
          </Link>
        </menu>

        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
