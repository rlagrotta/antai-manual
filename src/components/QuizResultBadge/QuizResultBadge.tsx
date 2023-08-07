import React from 'react';
import styles from './QuizResultBadge.module.css';
import { Lexend_Exa } from 'next/font/google';

const LexendExa = Lexend_Exa({ subsets: ['latin'] });

interface QuizResultBadgeProps {
  state: 'SUCCESS' | 'FAILURE' | undefined;
}

export default function QuizResultBadge({ state }: QuizResultBadgeProps) {
  if (!state) {
    throw new Error('State is required');
  }

  const isSuccess = state === 'SUCCESS';
  return null;
  return (
    <div
      className={`${styles.mainContainer} ${LexendExa.style} ${
        isSuccess && styles.mainContainerSuccess
      }`}
    >
      {/* <h2 className={styles.title}>{`${correctAnswers}/${totalQuestions}`}</h2> */}
    </div>
  );
}
