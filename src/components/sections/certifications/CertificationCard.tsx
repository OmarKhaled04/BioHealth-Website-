// Card for displaying a single certification — hover lift and logo scale animations
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Certification } from '@/types/certification';
import { Card } from '@/components/ui/Card';

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <Card className="flex flex-col items-center p-6 text-center">
        <motion.div
          className="relative mb-4 h-20 w-20"
          whileHover={{ rotate: [0, -4, 4, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={certification.imageUrl}
            alt={certification.name}
            fill
            className="object-contain"
            sizes="80px"
          />
        </motion.div>
        <h3 className="font-semibold text-gray-900">{certification.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{certification.issuer}</p>
        <p className="mt-1 text-xs text-gray-400">{certification.year}</p>
      </Card>
    </motion.div>
  );
}
