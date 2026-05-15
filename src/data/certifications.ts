import type { Certification, CertCategory } from '@/types/certification';

export const certifications: Certification[] = [
  // ── Food Safety ──────────────────────────────────────────────────────────────
  {
    id: 'fssc-2028',
    name: 'FSSC 22000',
    issuer: 'DNV Business Assurance Italy',
    certNumber: 'C620718',
    validUntil: '16 January 2028',
    imageUrl: '/images/certificates/fssc-22000-current.png',
    pdfUrl:   '/images/certificates/fssc-22000-current.png',
    category: 'food-safety',
  },
  {
    id: 'ifs-v8-2026',
    name: 'IFS Food',
    issuer: 'DNV Business Assurance Italy',
    certNumber: '185606-2015-AIFS-IBE-ACCREDIA',
    validUntil: '15 December 2026',
    imageUrl: '/images/certificates/ifs-v8-current.png',
    pdfUrl:   '/images/certificates/ifs-v8-current.png',
    category: 'food-safety',
  },

  // ── Quality Management ────────────────────────────────────────────────────────
  {
    id: 'iso-9001-2028',
    name: 'ISO 9001:2015',
    issuer: 'DNV Business Assurance',
    certNumber: 'C747680',
    validUntil: '30 November 2028',
    imageUrl: '/images/certificates/iso-9001-current.png',
    pdfUrl:   '/images/certificates/iso-9001-current.png',
    category: 'quality',
  },
  {
    id: 'cert-excelencia',
    name: 'UNE 15896:2015 — Certificate of Excellence',
    issuer: 'Bureau Veritas Certification',
    certNumber: 'ES079235-1',
    validUntil: '5 March 2020',
    imageUrl: '/images/certificates/cert-excelencia.png',
    pdfUrl:   '/images/certificates/cert-excelencia.png',
    category: 'quality',
  },

  // ── Halal & Compliance ────────────────────────────────────────────────────────
  {
    id: 'halal-certifica-2029',
    name: 'Halal Certificate',
    issuer: 'Instituto Halal — EGCH',
    certNumber: 'IH-400/1.8/O/3',
    validUntil: '3 January 2029',
    imageUrl: '/images/certificates/halal-current.png',
    pdfUrl:   '/images/certificates/halal-current.png',
    category: 'halal',
  },
  {
    id: 'halal-annex-2029',
    name: 'Halal — Annex of Certified Products',
    issuer: 'Instituto Halal — EGCH',
    certNumber: 'IH-400/1.8/O/3',
    validUntil: '3 January 2029',
    imageUrl: '/images/certificates/halal-annex-current.png',
    pdfUrl:   '/images/certificates/halal-annex-current.png',
    category: 'halal',
  },
  {
    id: 'ogs-trademark',
    name: 'OGS Trade Mark Registration',
    issuer: 'Oficina Española de Patentes y Marcas',
    certNumber: 'Marca No. 3.073.300',
    validUntil: '1 August 2024',
    imageUrl: '/images/certificates/ogs-trademark.png',
    pdfUrl:   '/images/certificates/ogs-trademark.png',
    category: 'halal',
  },
  {
    id: 'pharm-canada-halal',
    name: 'Pharm Canada Halal Certificate',
    issuer: 'ISNA Halal Certification Agency',
    certNumber: 'HCA 2016 – 065',
    validUntil: '30 October 2017',
    imageUrl: '/images/certificates/pharm-canada-halal.png',
    pdfUrl:   '/images/certificates/pharm-canada-halal.png',
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
