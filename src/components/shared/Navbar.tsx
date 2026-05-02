// Site-wide navigation bar with locale-aware links and language switcher
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/products', label: t('products') },
    { href: '/certifications', label: t('certifications') },
    { href: '/contact', label: t('contact') },
    { href: '/partnership', label: t('partnership') },
  ];

  return (
    <>
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

          {/* Desktop nav — unchanged */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary-700 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
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

          {/* Right side: language switcher + hamburger */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-50"
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: '#1e1b4b',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: '#1e1b4b',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: '#1e1b4b',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#1e1b4b',
                textDecoration: 'none',
                letterSpacing: '0.5px',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            onClick={() => setIsOpen(false)}
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#7c3aed',
              textDecoration: 'none',
            }}
          >
            ✨ {t('quiz')}
          </Link>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </>
  );
}
