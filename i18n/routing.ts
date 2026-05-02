// next-intl routing configuration — defines supported locales and default
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false,
});
