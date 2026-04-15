// Locale-aware navigation helpers — use these instead of next/link for internal routes
import { createNavigation } from 'next-intl/navigation';
import { routing } from '@i18n/routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
