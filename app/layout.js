import './globals.css';
import { Rubik } from 'next/font/google';

const font = Rubik({ subsets: ['latin'] });

export const metadata = {
  title: 'Lazilearning',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
