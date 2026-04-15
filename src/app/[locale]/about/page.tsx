// About page stub
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary-700">About BioHealth</h1>
      <p className="mt-4 text-gray-600">Our story and mission — coming soon.</p>
    </main>
  );
}
