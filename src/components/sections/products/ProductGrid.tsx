// Product grid — stagger-animates all product cards into view
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import { ProductCard } from './ProductCard';
import { products } from '@/data/products';

export function ProductGrid() {
  return (
    <StaggerGrid className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
