import type { Certification, CertCategory } from '@/types/certification';

export const certifications: Certification[] = [
  // ── Food Safety ─────────────────────────────────────────────────────────────
  {
    id: 'fssc-2025',
    name: 'FSSC 22000 — Version 5.1',
    issuer: 'DNV Business Assurance',
    certNumber: '128539-2012-FSMS-IBE-RvA',
    validUntil: '16 January 2025',
    imageUrl: '/images/certificates/fssc-22000-2025.png',
    pdfUrl: '/certificates/fssc-22000-2025.pdf',
    category: 'food-safety',
  },
  {
    id: 'fssc-2019',
    name: 'FSSC 22000 — Version 3',
    issuer: 'DNV GL Business Assurance',
    certNumber: '128539-2012-FSMS-IBE-RvA',
    validUntil: '17 January 2019',
    imageUrl: '/images/certificates/fssc-22000-2019.png',
    pdfUrl: '/certificates/fssc-22000-2019.pdf',
    category: 'food-safety',
  },
  {
    id: 'ifs-v7',
    name: 'IFS Food — Version 7',
    issuer: 'DNV Business Assurance Italy',
    certNumber: '185606-2015-AIFS-IBE-ACCREDIA',
    validUntil: '15 December 2022',
    imageUrl: '/images/certificates/ifs-v7-2022.png',
    pdfUrl: '/certificates/ifs-v7-2022.pdf',
    category: 'food-safety',
  },
  {
    id: 'ifs-v6',
    name: 'IFS Food — Version 6',
    issuer: 'DNV GL Business Assurance Italy',
    certNumber: '185606-2015-AIFS-IBE-ACCREDIA',
    validUntil: '2 September 2017',
    imageUrl: '/images/certificates/ifs-v6-2016.png',
    pdfUrl: '/certificates/ifs-v6-2016.pdf',
    category: 'food-safety',
  },

  // ── Quality Management ───────────────────────────────────────────────────────
  {
    id: 'iso-9001-2015',
    name: 'ISO 9001:2015',
    issuer: 'DNV GL Business Assurance España',
    certNumber: '205016-2016-AQ-IBE-ENAC',
    validUntil: '30 November 2022',
    imageUrl: '/images/certificates/iso-9001-2015.png',
    pdfUrl: '/certificates/iso-9001-2015.pdf',
    category: 'quality',
  },
  {
    id: 'iso-9001-2008',
    name: 'ISO 9001:2008',
    issuer: 'DNV GL Business Assurance España',
    certNumber: '205016-2016-AQ-IBE-ENAC',
    validUntil: '15 September 2018',
    imageUrl: '/images/certificates/iso-9001-2008.png',
    pdfUrl: '/certificates/iso-9001-2008.pdf',
    category: 'quality',
  },

  // ── Halal & Compliance ───────────────────────────────────────────────────────
  {
    id: 'halal',
    name: 'Halal Assurance Certificate',
    issuer: 'Instituto Halal — EGCH',
    certNumber: 'IH-400.2021.R07.04',
    validUntil: '3 January 2022',
    imageUrl: '/images/certificates/halal.png',
    pdfUrl: '/certificates/halal.pdf',
    category: 'halal',
  },
  {
    id: 'manufacturer',
    name: 'Manufacturer Certificate',
    issuer: 'Industrias Lácteas Asturianas S.A.',
    certNumber: 'RSI: 26.291/O',
    validUntil: '—',
    imageUrl: '/images/certificates/manufacturer.png',
    pdfUrl: '/certificates/manufacturer.pdf',
    category: 'halal',
  },
  {
    id: 'trademark',
    name: 'Trademark Registration — Lactonic',
    issuer: 'Oficina Española de Patentes y Marcas',
    certNumber: 'Marca Nº 3.073.300',
    validUntil: '—',
    imageUrl: '/images/certificates/trademark.png',
    pdfUrl: '/certificates/trademark.pdf',
    category: 'halal',
  },
];

export const certCategories: { id: CertCategory; labelKey: string; descriptionKey: string }[] = [
  {
    id: 'food-safety',
    labelKey: 'certifications.categories.foodSafety.label',
    descriptionKey: 'certifications.categories.foodSafety.description',
  },
  {
    id: 'quality',
    labelKey: 'certifications.categories.quality.label',
    descriptionKey: 'certifications.categories.quality.description',
  },
  {
    id: 'halal',
    labelKey: 'certifications.categories.halal.label',
    descriptionKey: 'certifications.categories.halal.description',
  },
];
