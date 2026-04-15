# BioHealth — Lactonic Infant Nutrition Website

A premium multilingual corporate website for the Lactonic baby nutrition 
brand. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, 
and next-intl for Arabic (RTL), English, and French support.

---

## Live Demo

> Add your deployment URL here once deployed (e.g. Vercel)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| i18n | next-intl v4 |
| Fonts | Inter (EN/FR), Tajawal (AR) via next/font |
| Images | next/image (optimized) |
| Deployment | Vercel (recommended) |

---

## Prerequisites

Make sure the following are installed on your machine before starting:

- **Node.js** v18.17 or higher → https://nodejs.org
- **npm** v9 or higher (comes with Node.js)
- **Git** → https://git-scm.com

Verify your versions:
```bash
node -v
npm -v
git --version
```

---

## Getting Started (Fresh Laptop Setup)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

This installs everything listed in package.json including Next.js, 
next-intl, Tailwind CSS, and all TypeScript types.

### 3. Run the development server

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:3000
```

The site automatically redirects to the default locale:
```
http://localhost:3000/en        ← English (LTR)
http://localhost:3000/ar        ← Arabic  (RTL)
http://localhost:3000/fr        ← French  (LTR)
```

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
BioHealth Website/
│
├── i18n/                          # Internationalization config
│   ├── locales/
│   │   ├── en.json                # English translations
│   │   ├── ar.json                # Arabic translations
│   │   └── fr.json                # French translations
│   ├── request.ts                 # next-intl server config
│   └── routing.ts                 # Locale definitions (en, ar, fr)
│
├── public/
│   ├── images/
│   │   ├── products/              # All 17 product packaging images
│   │   ├── certificates/          # ISO, Halal certificate PNGs
│   │   └── brand/                 # Logo, favicon
│   └── videos/                    # Promotional videos
│
├── src/
│   ├── app/
│   │   ├── [locale]/              # All routes scoped under locale prefix
│   │   │   ├── layout.tsx         # Root layout (sets dir=rtl/ltr, fonts)
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── about/             # About page
│   │   │   ├── products/          # Products listing page
│   │   │   │   └── [slug]/        # Product detail page
│   │   │   ├── certifications/    # Certifications page
│   │   │   └── contact/           # Contact page
│   │   ├── sitemap.ts             # Auto-generated multilingual sitemap
│   │   └── robots.ts              # Crawler rules
│   │
│   ├── components/
│   │   ├── ui/                    # Primitive atoms (Button, Card, Badge…)
│   │   ├── shared/                # Layout components (Navbar, Footer…)
│   │   └── sections/              # Page-specific content blocks
│   │       ├── home/
│   │       ├── products/          # ProductCard, ProductCatalog, etc.
│   │       └── certifications/
│   │
│   ├── data/
│   │   ├── products.ts            # All 17 products with full metadata
│   │   └── certifications.ts      # Certification data
│   │
│   ├── types/
│   │   ├── product.ts             # Product TypeScript interface
│   │   └── certification.ts       # Certification TypeScript interface
│   │
│   └── lib/
│       ├── fonts.ts               # Inter + Tajawal font config
│       └── utils.ts               # Shared utility functions
│
├── middleware.ts                  # Locale detection + redirect
├── next.config.ts                 # Next.js config (next-intl plugin)
├── tailwind.config.ts             # Tailwind + violet brand theme
└── tsconfig.json                  # TypeScript config + path aliases
```

---

## Pages

| Route | Description |
|---|---|
| `/[locale]` | Home page with hero, featured products, promo video |
| `/[locale]/about` | Company profile and values |
| `/[locale]/products` | Full product catalog with category filter |
| `/[locale]/products/[slug]` | Individual product detail page |
| `/[locale]/certifications` | ISO, Halal, and quality certificates |
| `/[locale]/contact` | Contact form |

---

## Products Catalog

The site includes 17 Lactonic products across two categories:

**Infant Formula (12 products)**
- Lactonic Gold 1, 2 / Lactolac Gold 3 — standard formula (stages 1–3)
- Ease to Go 1, 2, 3 — convenient formula line
- Lactonic AC Gold — anti-colic formula
- Lactonic AR Gold — anti-regurgitation formula
- Lactonic HA Plus 1, 2, 3 — hypoallergenic formula
- Lactonic LF — lactose-free formula

**Baby Food (5 products)**
- 3 Fruits puree (+4 months)
- 4 Fruits with Cookie (+6 months)
- Baby Kabsah — chicken with rice (+6 months)
- Fruit and Cereals (+6 months)
- Vegetables with Beef (+6 months)

To add a new product, add one object to `src/data/products.ts` 
and place the image in `public/images/products/`.

---

## Adding Translations

All UI text lives in `i18n/locales/`. To complete Arabic and French:

1. Open `i18n/locales/ar.json`
2. Fill in the empty string values with the Arabic translations
3. Repeat for `fr.json`

Keys are namespaced by page: `nav.home`, `products.title`, etc.

---

## Team & Responsibilities

| Developer | Responsibility |
|---|---|
| Dev A | Foundation, i18n, routing, UI library, SEO |
| Dev B | Product data, product pages, image optimization |
| Dev C | Home, About, Certifications, Contact pages |

---

## Deployment (Vercel — Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com and import your repository
3. Vercel auto-detects Next.js — click Deploy
4. Your site is live with automatic HTTPS and CDN

No environment variables are required for the base site.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint checks |

---

## License

Private — all product images and brand assets belong to Lactonic / BioHealth.
