import type { Config } from 'tailwindcss';
import preset from '@lazidog/ui/tailwind-preset';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [preset],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

