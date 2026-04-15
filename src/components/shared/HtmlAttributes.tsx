// Sets locale-specific html attributes (lang, dir, class) on the client after hydration
'use client';

import { useEffect } from 'react';

interface HtmlAttributesProps {
  locale: string;
  isRTL: boolean;
  fontClassNames: string;
}

export function HtmlAttributes({ locale, isRTL, fontClassNames }: HtmlAttributesProps) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = isRTL ? 'rtl' : 'ltr';
    html.className = fontClassNames;
    document.body.className = `antialiased bg-white text-gray-900 ${
      isRTL ? 'font-arabic' : 'font-sans'
    }`;
  }, [locale, isRTL, fontClassNames]);

  return null;
}
