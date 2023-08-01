import React, { useEffect } from 'react';
import styles from './AnswerResultBadge.module.css';

interface AnswerResultBadgeProps {
  state: 'correct' | 'incorrect';
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnswerResultBadge({ state, show, setShow }: AnswerResultBadgeProps) {
  const isSuccess = state === 'correct';

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [show, setShow]);

  return (
    <div
      className={`${styles.mainContainer} ${isSuccess && styles.mainContainerSuccess} ${
        show && styles.mainContainerShow
      }`}
    >
      {state === 'correct' ? '¡Respuesta correcta!' : 'Respuesta erronea'}
    </div>
  );
}
