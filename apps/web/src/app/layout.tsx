import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'lazidog.dev',
  description: 'Multi-surface platform scaffold',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
