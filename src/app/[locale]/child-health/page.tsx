import type { Metadata } from 'next';
import { ChildHealthSection } from '@/components/sections/child-health/ChildHealthSection';

export const metadata: Metadata = {
  title: 'Child Health & Development Tools | BioHealth Prodentia',
  description: 'Interactive WHO growth tracker, brain development milestones, vaccination schedule tracker, and downloadable health charts for parents.',
};

export default function ChildHealthPage() {
  return <ChildHealthSection />;
}
