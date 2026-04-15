// Placeholder certification data — replace with CMS or API data in production
import type { Certification } from '@/types/certification';

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'ISO 22000:2018',
    issuer: 'Bureau Veritas',
    imageUrl: '/images/certificates/iso-22000.png',
    year: 2023,
  },
  {
    id: '2',
    name: 'Halal Certified',
    issuer: 'IFANCA',
    imageUrl: '/images/certificates/halal.png',
    year: 2024,
  },
  {
    id: '3',
    name: 'Organic Certification',
    issuer: 'ECOCERT',
    imageUrl: '/images/certificates/organic.png',
    year: 2023,
  },
];
