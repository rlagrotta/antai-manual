import React from 'react';
import styles from './Quizlayout.module.css';
interface props {
  children: React.ReactNode;
}
export default function QuizLayout({ children }: props) {
  return <div className={styles.mainContainer}>{children}</div>;
}
