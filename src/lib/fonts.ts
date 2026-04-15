// Google Font instances for Latin (Inter) and Arabic (Tajawal) scripts
import { Inter, Tajawal } from 'next/font/google';

export const fontSans = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontArabic = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-arabic',
  display: 'swap',
});
