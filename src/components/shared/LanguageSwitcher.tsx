// Language switcher — links to the same path in each supported locale
'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'ع' },
  { code: 'fr', label: 'FR' },
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as LocaleCode) ?? 'en';

  function getLocalePath(targetLocale: LocaleCode): string {
    const localePattern = LOCALES.map((l) => l.code).join('|');
    return pathname.replace(
      new RegExp(`^/(${localePattern})`),
      `/${targetLocale}`
    );
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map(({ code, label }) => (
        <Link
          key={code}
          href={getLocalePath(code)}
          className={cn(
            'rounded px-2 py-1 text-xs font-semibold transition-colors',
            currentLocale === code
              ? 'bg-primary-100 text-primary-800'
              : 'text-gray-500 hover:text-primary-700'
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
