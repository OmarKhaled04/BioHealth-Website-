// Contact page stub
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary-700">Contact Us</h1>
      <p className="mt-4 text-gray-600">Contact form — coming soon.</p>
    </main>
  );
}
