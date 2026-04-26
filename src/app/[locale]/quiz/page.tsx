import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BabyQuiz } from '@/components/sections/quiz/BabyQuiz';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('quiz');
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function QuizPage() {
  return <BabyQuiz />;
}
