import React from 'react';
import styles from './QuizResultComponent.module.css';
import QuizResultBadge from '../QuizResultBadge/QuizResultBadge';

interface QuizResultComponentProps {
  state: 'SUCCESS' | 'FAILURE' | undefined;
}

export default function QuizResultComponent({ state }: QuizResultComponentProps) {
  const texts = {
    SUCCESS: '¡Fantástico! Has dominado el tema.',
    FAILURE: 'Casi lo logras. Un poco más de revisión y estarás listo.',
  };

  return (
    <div className={styles.mainComponent}>
      <div
        className={`${state === 'SUCCESS' && styles.successIlustration} ${
          state === 'FAILURE' && styles.failureIlustration
        } ${styles.ilustration}`}
      ></div>
      <QuizResultBadge state={state} />
      {state && <h2 className={styles.text}>{texts[state]}</h2>}
    </div>
  );
}
