// Site-wide footer with copyright notice
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-10">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 flex flex-col items-center gap-2">
          <Image
            src="/logo/dolphine.png"
            alt="BioHealth Prodentia logo"
            width={52}
            height={52}
            className="object-contain"
          />
          <span className="text-base font-bold text-violet-700">BioHealth Prodentia</span>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {year} {t('company')}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
