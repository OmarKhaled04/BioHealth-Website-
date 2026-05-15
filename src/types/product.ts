export type AgeUnit = 'months' | 'years';

export interface Product {
  id: string;
  slug: string;
  name?: string;
  category: 'formula' | 'baby-food' | 'cereals' | 'maternal' | 'gummy';
  subCategory: 'standard' | 'ease-to-go' | 'specialized' | 'puree' | 'meal' | 'cereal' | 'maternal' | 'gummy-vitamin';
  stage: number | null;
  ageRange: {
    min: number;
    max: number | null;
    unit: AgeUnit;
  };
  imagePath: string;
  badgeKey: string;
  nameKey: string;
  descriptionKey: string;
  netWeight?: string;
  featureKeys: string[];
}
