// Promotional video section — fades and scales in when scrolled into view
import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function PromoVideoSection() {
  const t = useTranslations('home.promo');

  return (
    <section className="bg-primary-50 py-20">
      <div className="container mx-auto px-4">
        <SectionTitle title={t('title')} subtitle={t('description')} />
        <AnimateIn delay={0.1} className="mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-2xl bg-gray-200 shadow-xl ring-1 ring-primary-100">
            <div className="flex h-full items-center justify-center text-gray-400">
              Video placeholder
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
