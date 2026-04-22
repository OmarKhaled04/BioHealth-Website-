'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations();
  const displayName = t(product.nameKey);
  const unitLabel = t(`products.${product.ageRange.unit}`);
  const ageLabel = product.ageRange.max
    ? `${product.ageRange.min}-${product.ageRange.max} ${unitLabel}`
    : `${product.ageRange.min}+ ${unitLabel}`;

  return (
    <div className="product-card-wrap" style={{ perspective: '1000px' }}>
      <div
        className="product-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#ffffff',
            border: '1px solid #ede9fe',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              padding: '24px 24px 0',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              src={product.imagePath}
              alt={displayName}
              width={140}
              height={185}
              style={{ objectFit: 'contain', width: '100%', height: 'auto', maxWidth: '140px' }}
            />
          </div>

          <div
            style={{
              padding: '14px 16px 20px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: '50px',
                background: '#ede9fe',
                color: '#6d28d9',
                fontSize: '11px',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              {ageLabel}
            </div>

            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#1e1b4b',
                lineHeight: 1.3,
              }}
            >
              {displayName}
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '28px 24px',
            gap: '8px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '2px',
            }}
          >
            {displayName}
          </div>

          <div
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '10px',
            }}
          >
            {ageLabel}
          </div>

          <ul style={{ listStyle: 'none', padding: 0, width: '100%', textAlign: 'left' }}>
            {product.features.slice(0, 4).map((feature, i) => (
              <li
                key={i}
                style={{
                  padding: '7px 0',
                  fontSize: '0.76rem',
                  color: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span
                  style={{
                    color: '#c4b5fd',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href={`/products/${product.slug}`}
            style={{
              marginTop: '14px',
              padding: '9px 24px',
              borderRadius: '50px',
              background: '#ffffff',
              color: '#4c1d95',
              fontWeight: 700,
              fontSize: '0.8rem',
              textDecoration: 'none',
              letterSpacing: '0.3px',
              flexShrink: 0,
            }}
          >
            {t('products.viewDetails')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
