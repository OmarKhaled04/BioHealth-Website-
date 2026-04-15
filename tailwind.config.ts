// Tailwind CSS v3: violet primary palette, dual font families, dark mode
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
