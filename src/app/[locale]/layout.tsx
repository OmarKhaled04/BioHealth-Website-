// Locale-aware layout: sets html lang/dir via client component, provides i18n context
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@i18n/routing';
import { fontSans, fontArabic } from '@/lib/fonts';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { HtmlAttributes } from '@/components/shared/HtmlAttributes';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: '%s | BioHealth',
    default: 'BioHealth Baby Nutrition',
  },
  description:
    'Pure, scientifically formulated baby nutrition trusted by parents worldwide.',
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';
  const fontClassNames = `${fontSans.variable} ${fontArabic.variable}`;

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlAttributes locale={locale} isRTL={isRTL} fontClassNames={fontClassNames} />
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
