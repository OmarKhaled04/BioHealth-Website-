import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ProductCatalog } from '@/components/sections/products/ProductCatalog';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('products');
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProductsPage() {
  const t = await getTranslations('products');

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
          {t('title')}
        </h1>
        <p className="mb-10 text-gray-500">{t('subtitle')}</p>
        <ProductCatalog />
      </div>
    </main>
  );
}
