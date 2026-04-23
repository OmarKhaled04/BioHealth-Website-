// Home page — composes hero, featured products, and promo video sections
import { HeroSection } from '@/components/sections/home/HeroSection';
import { WhyLactonic } from '@/components/sections/home/WhyLactonic';
import { PromoVideoSection } from '@/components/sections/home/PromoVideoSection';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-violet-700">
      <HeroSection />
      <WhyLactonic />
      <PromoVideoSection />
    </main>
  );
}
