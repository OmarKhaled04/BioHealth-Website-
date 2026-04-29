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
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo/dolphine.png"
            alt="BioHealth Prodentia logo"
            width={40}
            height={40}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <span className="h-8 w-px bg-violet-200" />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-violet-900">
              Bio Health
            </span>
            <span className="mt-[3px] text-[9.5px] font-semibold uppercase tracking-[0.22em] text-violet-400">
              Prodentia
            </span>
          </div>
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
          <li>
            <Link href="/partnership" className="hover:text-primary-700 transition-colors">
              {t('partnership')}
            </Link>
          </li>
          <li>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 rounded-full bg-violet-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-800"
            >
              <span>✨</span>
              {t('quiz')}
            </Link>
          </li>
        </ul>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
  