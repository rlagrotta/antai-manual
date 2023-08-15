'use client';
import React from 'react';
import styles from './QuizIntroComponent.module.css';
import { Lexend_Exa } from 'next/font/google';
const LexendExa = Lexend_Exa({ subsets: ['latin'] });
export default function QuizIntroComponent() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.quizIlustration}></div>
      <div className={styles.textContainer}>
        <h1 className={`${styles.title} ${LexendExa.className}`}>¡Es momento del Quiz!</h1>
        <ul className={styles.listContainer}>
          <li className={styles.listElement}>
            ¡Es opcional y puedes hacerlo cuantas veces desees!
          </li>
          <li className={styles.listElement}>El quiz consta de una pregunta por capítulo.</li>
          <li className={styles.listElement}>No tienes límite de tiempo para responder</li>
        </ul>
      </div>
    </div>
  );
}
