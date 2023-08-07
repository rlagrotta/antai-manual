import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Lexend_Giga } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';

import { ScrollContext } from './../../contexts/ScrollContext';
import { ProgressBarLine } from './components/ProgressBarLine';
import manifest from './../../json/manifest.json';
import styles from './ProgressBar.module.css';
import { QuizContext, QuizContextProvider } from '@/contexts/QuizProvider';

const LexendGiga = Lexend_Giga({ subsets: ['latin'] });

export default function ProgressBar() {
  const params = useParams();
  const currentRoute = usePathname();
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const { currentQuestion, currentStep, totalQuestions, quizTitle } =
    useContext<QuizContextProvider | null>(QuizContext)!;

  const { progress } = useContext(ScrollContext)!;
  const [title, setTitle] = useState('');
  const [isHome, setIsHome] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isLastChapter, setIsLastChapter] = useState(false);

  useEffect(() => {
    if (isQuiz) {
      if (currentStep === 'INTRO') {
        // cambiar cuando se tenga el origen de la data de los quizzes
        setTitle(quizTitle ?? 'QUIZ');
        return;
      }
      if (currentStep === 'RESULT') {
        setTitle('¡QUIZ TERMINADO!');
        return;
      }
      setTitle(`Pregunta ${currentQuestion}/${totalQuestions}`);
      return;
    }
    if (params?.slug && parseInt(params?.slug[0]) === manifest.chapters.length) {
      setCurrentChapter(parseInt(params?.slug[0]));
      setIsLastChapter(true);
      setTitle(manifest.chapters[parseInt(params?.slug[0]) - 1].title);
    } else {
      setIsLastChapter(false);
      if (params?.slug) {
        setCurrentChapter(parseInt(params?.slug[0]));
        setTitle(manifest.chapters[parseInt(params?.slug[0]) - 1].title);
      }
    }
  }, [params?.slug, currentQuestion, currentStep, totalQuestions, quizTitle, isQuiz]);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      const height = progressBar.offsetHeight;
      document.documentElement.style.setProperty('--progressBarHeight', `${height}px`);
    }
  }, [title]);

  useEffect(() => {
    const isQuiz = /^\/quiz\/\d+(\/[^\/]+)?\/?$/.test(currentRoute);
    setIsHome(currentRoute === '/');
    setIsQuiz(isQuiz);
  }, [currentRoute]);

  if (isHome) return null;
  if (isQuiz) return null;
  return (
    <div
      className={`${styles.mainContainer} ${LexendGiga.className} ${
        isQuiz && styles.mainContainerQuiz
      }`}
      ref={progressBarRef}
    >
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.subContainer}>
        {!isQuiz ? (
          <>
            <span className={styles.text}>Cap {currentChapter}</span>
            <ProgressBarLine progress={progress} />
            {!isLastChapter && <span className={styles.text}>Cap {currentChapter + 1}</span>}
          </>
        ) : (
          <>
            {currentStep === 'QUESTION' && (
              <ProgressBarLine progress={(currentQuestion / totalQuestions) * 100} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
