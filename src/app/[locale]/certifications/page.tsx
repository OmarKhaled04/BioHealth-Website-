import type { Metadata } from 'next';
import { CertificationCard } from '@/components/sections/certifications/CertificationCard';
import { certifications, certCategories } from '@/data/certifications';
import { CertHero } from '@/components/sections/certifications/CertHero';
import { CertAtAGlance } from '@/components/sections/certifications/CertAtAGlance';
import { CertCategoryHeader } from '@/components/sections/certifications/CertCategoryHeader';

export const metadata: Metadata = {
  title: 'Certifications',
  description:
    'BioHealth quality and safety certifications — FSSC 22000, IFS, ISO 9001, and Halal.',
};

export default function CertificationsPage() {
  return (
    <main className="bg-white">
      <CertHero />
      <CertAtAGlance />

      <div className="container mx-auto space-y-24 px-4 py-20">
        {certCategories.map((cat, catIndex) => {
          const items = certifications.filter((c) => c.category === cat.id);
          if (!items.length) return null;

          return (
            <section key={cat.id}>
              <CertCategoryHeader
                index={catIndex + 1}
                label={cat.label}
                description={cat.description}
                category={cat.id}
              />

              <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((cert, i) => (
                  <CertificationCard key={cert.id} certification={cert} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Trust footer strip */}
      <div className="relative overflow-hidden border-t border-gray-100 bg-gradient-to-r from-primary-950 via-primary-900 to-violet-900 py-14 text-center text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(167,139,250,0.1),transparent)]" />
        <p className="relative text-base font-medium text-white/70">
          All certifications are issued by internationally accredited bodies
        </p>
        <p className="relative mt-1 text-sm text-white/40">
          Subject to annual audits and continuous quality monitoring
        </p>
      </div>
    </main>
  );
}
