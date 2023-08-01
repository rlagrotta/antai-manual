import React from 'react';
import styles from './ProgressBarLine.module.css';

interface ProgressBarLineProps {
  progress: number;
}

export const ProgressBarLine = ({ progress }: ProgressBarLineProps) => {
  let progressWidth = progress.toString() + '%';

  if (progress < 0) {
    progressWidth = '0%';
  }
  if (progress > 100) {
    progressWidth = '100%';
  }
  return (
    <div className={styles.barContainer}>
      <div style={{ width: progressWidth }} className={styles.progress}></div>
    </div>
  );
};
