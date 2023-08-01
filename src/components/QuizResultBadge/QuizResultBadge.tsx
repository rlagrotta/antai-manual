import React from 'react';
import styles from './QuizResultBadge.module.css';
import { Lexend_Exa } from 'next/font/google';

const LexendExa = Lexend_Exa({ subsets: ['latin'] });

interface QuizResultBadgeProps {
  correctAnswers: number;
  totalQuestions: number;
  state: 'success' | 'error';
}

export default function QuizResultBadge({
  correctAnswers = 0,
  totalQuestions = 0,
  state,
}: QuizResultBadgeProps) {
  if (!state) {
    throw new Error('State is required');
  }
  if (!correctAnswers || !totalQuestions) {
    throw new Error('Correct answers is required');
  }
  if (typeof correctAnswers !== 'number' || typeof totalQuestions !== 'number') {
    throw new Error('Correct answers must be a number');
  }
  if (correctAnswers < 0 || totalQuestions < 0) {
    throw new Error('Correct answers cannot be less than 0');
  }
  if (correctAnswers > totalQuestions) {
    throw new Error('Correct answers cannot be more than total questions');
  }

  const isSuccess = state === 'success';

  return (
    <div
      className={`${styles.mainContainer} ${LexendExa.style} ${
        isSuccess && styles.mainContainerSuccess
      }`}
    >
      <h2 className={styles.title}>{`${correctAnswers}/${totalQuestions}`}</h2>
    </div>
  );
}
