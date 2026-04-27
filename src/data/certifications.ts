import type { Certification, CertCategory } from '@/types/certification';

export const certifications: Certification[] = [
  // ── Food Safety — Current ────────────────────────────────────────────────────
  {
    id: 'fssc-2028',
    name: 'FSSC 22000',
    issuer: 'DNV Business Assurance Italy',
    certNumber: 'C620718',
    validUntil: '16 January 2028',
    imageUrl: '/images/certificates/FSSC_22000_Food-ENG-C620718-10-20250821(16.01.28).png',
    pdfUrl:   '/images/certificates/FSSC_22000_Food-ENG-C620718-10-20250821(16.01.28).png',
    category: 'food-safety',
  },
  {
    id: 'ifs-v8-2026',
    name: 'IFS Food — Version 8',
    issuer: 'DNV Business Assurance Italy',
    certNumber: '185606-2015-AIFS-IBE-ACCREDIA',
    validUntil: '15 December 2026',
    imageUrl: '/images/certificates/IFS%20185606-2015-AIFS-IBE-ACCREDIA(15.12.26).png',
    pdfUrl:   '/images/certificates/IFS%20185606-2015-AIFS-IBE-ACCREDIA(15.12.26).png',
    category: 'food-safety',
  },

  // ── Food Safety — Historical ─────────────────────────────────────────────────
  {
    id: 'fssc-2025',
    name: 'FSSC 22000 — Version 5.1',
    issuer: 'DNV Business Assurance',
    certNumber: '128539-2012-FSMS-IBE-RvA',
    validUntil: '16 January 2025',
    imageUrl: '/images/certificates/fssc-22000-2025.png',
    pdfUrl:   '/images/certificates/fssc-22000-2025.png',
    category: 'food-safety',
  },
  {
    id: 'fssc-2019',
    name: 'FSSC 22000 — Version 3',
    issuer: 'DNV GL Business Assurance',
    certNumber: '128539-2012-FSMS-IBE-RvA',
    validUntil: '17 January 2019',
    imageUrl: '/images/certificates/fssc-22000-2019.png',
    pdfUrl:   '/images/certificates/fssc-22000-2019.png',
    category: 'food-safety',
  },
  {
    id: 'ifs-v7',
    name: 'IFS Food — Version 7',
    issuer: 'DNV Business Assurance Italy',
    certNumber: '185606-2015-AIFS-IBE-ACCREDIA',
    validUntil: '15 December 2022',
    imageUrl: '/images/certificates/ifs-v7-2022.png',
    pdfUrl:   '/images/certificates/ifs-v7-2022.png',
    category: 'food-safety',
  },
  {
    id: 'ifs-v6',
    name: 'IFS Food — Version 6',
    issuer: 'DNV GL Business Assurance Italy',
    certNumber: '185606-2015-AIFS-IBE-ACCREDIA',
    validUntil: '2 September 2017',
    imageUrl: '/images/certificates/ifs-v6-2016.png',
    pdfUrl:   '/images/certificates/ifs-v6-2016.png',
    category: 'food-safety',
  },

  // ── Quality Management — Current ─────────────────────────────────────────────
  {
    id: 'iso-9001-2028',
    name: 'ISO 9001:2015',
    issuer: 'DNV Business Assurance',
    certNumber: 'C747680',
    validUntil: '30 November 2028',
    imageUrl: '/images/certificates/ISO_9001-ENG-C747680-6-20251203(30.11.28).png',
    pdfUrl:   '/images/certificates/ISO_9001-ENG-C747680-6-20251203(30.11.28).png',
    category: 'quality',
  },

  // ── Quality Management — Historical ──────────────────────────────────────────
  {
    id: 'iso-9001-2022',
    name: 'ISO 9001:2015',
    issuer: 'DNV GL Business Assurance España',
    certNumber: '205016-2016-AQ-IBE-ENAC',
    validUntil: '30 November 2022',
    imageUrl: '/images/certificates/iso-9001-2015.png',
    pdfUrl:   '/images/certificates/iso-9001-2015.png',
    category: 'quality',
  },
  {
    id: 'iso-9001-2008',
    name: 'ISO 9001:2008',
    issuer: 'DNV GL Business Assurance España',
    certNumber: '205016-2016-AQ-IBE-ENAC',
    validUntil: '15 September 2018',
    imageUrl: '/images/certificates/iso-9001-2008.png',
    pdfUrl:   '/images/certificates/iso-9001-2008.png',
    category: 'quality',
  },

  // ── Halal & Compliance — Current ─────────────────────────────────────────────
  {
    id: 'halal-certifica-2029',
    name: 'Halal Certificate',
    issuer: 'Instituto Halal — EGCH',
    certNumber: 'IH-0400.2025.C10.S0',
    validUntil: '3 January 2029',
    imageUrl: '/images/certificates/Halal%20Certificate.png',
    pdfUrl:   '/images/certificates/Halal%20Certificate.png',
    category: 'halal',
  },
  {
    id: 'halal-annex-2029',
    name: 'Halal — Annex of Certified Products',
    issuer: 'Instituto Halal — EGCH',
    certNumber: 'IH-0400.2025.C10.S0',
    validUntil: '3 January 2029',
    imageUrl: '/images/certificates/AMENDMENT%20PRONUBEN-page-01.png',
    pdfUrl:   '/images/certificates/AMENDMENT%20PRONUBEN-page-01.png',
    category: 'halal',
  },
  {
    id: 'trademark',
    name: 'Trademark Registration — Lactonic',
    issuer: 'Oficina Española de Patentes y Marcas',
    certNumber: 'Marca Nº 3.073.300',
    validUntil: '—',
    imageUrl: '/images/certificates/trademark.png',
    pdfUrl:   '/images/certificates/trademark.png',
    category: 'halal',
  },

  // ── Halal & Compliance — Historical ──────────────────────────────────────────
  {
    id: 'halal-2022',
    name: 'Halal Assurance Certificate',
    issuer: 'Instituto Halal — EGCH',
    certNumber: 'IH-400.2021.R07.04',
    validUntil: '3 January 2022',
    imageUrl: '/images/certificates/halal.png',
    pdfUrl:   '/images/certificates/halal.png',
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
