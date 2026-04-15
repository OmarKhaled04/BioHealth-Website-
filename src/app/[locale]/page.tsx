// Home page — composes hero, featured products, and promo video sections
import { HeroSection } from '@/components/sections/home/HeroSection';
import { FeaturedProducts } from '@/components/sections/home/FeaturedProducts';
import { PromoVideoSection } from '@/components/sections/home/PromoVideoSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <PromoVideoSection />
    </main>
  );
}
