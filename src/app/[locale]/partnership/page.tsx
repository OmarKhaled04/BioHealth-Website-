import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PartnershipSection } from '@/components/sections/partnership/PartnershipSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('partnership');
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function PartnershipPage() {
  return <PartnershipSection />;
}
