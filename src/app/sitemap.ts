// XML sitemap — generates locale-prefixed URLs for all static routes
import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biohealth.example.com';

const locales = ['en', 'ar', 'fr'] as const;
const routes = ['', '/about', '/products', '/certifications', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
