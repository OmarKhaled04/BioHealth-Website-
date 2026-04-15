// Certifications page stub
import type { Metadata } from 'next';
import { CertificationCard } from '@/components/sections/certifications/CertificationCard';
import { certifications } from '@/data/certifications';

export const metadata: Metadata = {
  title: 'Certifications',
};

export default function CertificationsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary-700">Our Certifications</h1>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>
    </main>
  );
}
