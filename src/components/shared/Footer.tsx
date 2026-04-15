// Site-wide footer with copyright notice
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>
          &copy; {year} {t('company')}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
