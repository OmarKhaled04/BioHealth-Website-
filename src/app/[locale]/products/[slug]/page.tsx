// Product detail page stub
import type { Metadata } from 'next';
import { ProductGallery } from '@/components/sections/products/ProductGallery';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, ' '),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="capitalize text-4xl font-bold text-primary-700">
        {slug.replace(/-/g, ' ')}
      </h1>
      <ProductGallery />
    </main>
  );
}
