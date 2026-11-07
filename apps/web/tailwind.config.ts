import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2fbff',
          100: '#dff4ff',
          200: '#b9eaff',
          300: '#7fdcff',
          400: '#3ac6ff',
          500: '#10a6ff',
          600: '#007fe0',
          700: '#0064b4',
          800: '#065594',
          900: '#0b467a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
