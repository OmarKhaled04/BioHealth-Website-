// Next.js configuration with next-intl plugin and strict mode
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Local images in public/ are served directly — no remote patterns needed.
  // next/image optimises them automatically without any extra config.
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
