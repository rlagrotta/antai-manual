import React from 'react';
import styles from './QuestionCard.module.css';

export interface QuestionCardProps {
  state?: 'success' | 'error' | 'selected' | 'default';
  letter: string;
  mainText: string;
  secondaryText: string;
}

export default function QuestionCard({
  state,
  letter,
  mainText,
  secondaryText,
}: QuestionCardProps) {
  const isSuccess = state === 'success';
  const isError = state === 'error';
  const isSelected = state === 'selected';

  return (
    <div
      className={`${styles.mainContainer} ${isSuccess && styles.mainContainerSuccess} ${
        isSelected && styles.mainContainerSelected
      } ${isError && styles.mainContainerError}`}
    >
      <div
        className={`${styles.letterContainer} ${isSuccess && styles.letterContainerSuccess} ${
          isSelected && styles.letterContainerSelected
        } ${isError && styles.letterContainerError}`}
      >
        <span>{letter}</span>
      </div>
      <div
        className={`${styles.textContainer} ${isSuccess && styles.textContainerSuccess} ${
          isError && styles.textContainerError
        } `}
      >
        <div className={styles.text1}>{mainText}</div>
        <div className={`${styles.text2} ${isSelected && styles.text2Selected}`}>
          {secondaryText}
        </div>
      </div>
    </div>
  );
}
