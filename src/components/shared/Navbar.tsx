// Site-wide navigation bar with locale-aware links and language switcher
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-violet-700">
          <Image
            src="/logo/dolphine.png"
            alt="BioHealth Prodentia logo"
            width={38}
            height={38}
            className="object-contain"
            priority
          />
          BioHealth
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <li>
            <Link href="/about" className="hover:text-primary-700 transition-colors">
              {t('about')}
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-primary-700 transition-colors">
              {t('products')}
            </Link>
          </li>
          <li>
            <Link href="/certifications" className="hover:text-primary-700 transition-colors">
              {t('certifications')}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-primary-700 transition-colors">
              {t('contact')}
            </Link>
          </li>
        </ul>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
