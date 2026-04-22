export type CertCategory = 'food-safety' | 'quality' | 'halal';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  certNumber: string;
  validUntil: string;
  imageUrl: string;
  pdfUrl: string;
  category: CertCategory;
}
