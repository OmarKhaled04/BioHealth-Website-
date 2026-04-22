import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CertificationCard } from '@/components/sections/certifications/CertificationCard';
import { certifications, certCategories } from '@/data/certifications';
import { CertHero } from '@/components/sections/certifications/CertHero';
import { CertAtAGlance } from '@/components/sections/certifications/CertAtAGlance';
import { CertCategoryHeader } from '@/components/sections/certifications/CertCategoryHeader';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('certifications.meta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CertificationsPage() {
  const t = await getTranslations();

  return (
    <main className="bg-white">
      <CertHero />
      <CertAtAGlance />

      <div className="container mx-auto space-y-24 px-4 py-20">
        {certCategories.map((cat, catIndex) => {
          const items = certifications.filter((certification) => certification.category === cat.id);
          if (!items.length) return null;

          return (
            <section key={cat.id}>
              <CertCategoryHeader
                index={catIndex + 1}
                label={t(cat.labelKey)}
                description={t(cat.descriptionKey)}
                category={cat.id}
              />

              <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((certification, i) => (
                  <CertificationCard key={certification.id} certification={certification} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="relative overflow-hidden border-t border-gray-100 bg-gradient-to-r from-primary-950 via-primary-900 to-violet-900 py-14 text-center text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(167,139,250,0.1),transparent)]" />
        <p className="relative text-base font-medium text-white/70">{t('certifications.footer.line1')}</p>
        <p className="relative mt-1 text-sm text-white/40">{t('certifications.footer.line2')}</p>
      </div>
    </main>
  );
}
