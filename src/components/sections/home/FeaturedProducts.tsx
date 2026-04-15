// Featured products section — stagger-animates product cards as they enter the viewport
import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import { ProductCard } from '@/components/sections/products/ProductCard';
import { products } from '@/data/products';

export function FeaturedProducts() {
  const t = useTranslations('home.featured');
  const featured = products.slice(0, 4);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <StaggerGrid className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
