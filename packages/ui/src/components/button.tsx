import * as React from 'react';
import { cn } from '../lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
};

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        size === 'sm' ? 'h-9 px-3 text-sm' : 'h-11 px-4 text-sm',
        variant === 'primary' &&
          'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900',
        variant === 'secondary' &&
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-400',
        variant === 'ghost' &&
          'bg-transparent text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-400',
        className,
      )}
      {...props}
    />
  );
}
