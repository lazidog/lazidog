import './globals.css';
import type { Metadata } from 'next';
import { AppProviders } from '../lib/providers/app-providers';

export const metadata: Metadata = {
  title: 'lazidog.dev',
  description: 'Multi-surface platform scaffold',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
