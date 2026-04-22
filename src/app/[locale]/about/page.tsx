import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AboutSection } from '@/components/sections/AboutSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function AboutPage() {
  return <AboutSection />;
}
