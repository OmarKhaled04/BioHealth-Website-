import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactSection } from '@/components/sections/contact/ContactSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact');
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function ContactPage() {
  return <ContactSection />;
}
