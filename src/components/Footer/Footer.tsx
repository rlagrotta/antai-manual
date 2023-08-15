'use client';

import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { Button } from '../Button';
import styles from './footer.module.css';
import manifest from './../../json/manifest.json';
import BottomSheet from '../BottomSheet/BottomSheet';
import { ScrollContext } from './../../contexts/ScrollContext';
import QuizButtons, { ButtonProps } from '../QuizButtons/QuizButtons';
import { QuizContext, QuizProviderState } from '@/contexts/QuizProvider';

const Footer = () => {
  const { currentStep, setCurrentStep } = useContext(QuizContext)!;
  const { push } = useRouter();
  const params = useParams();
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollUp, scrollDown, nextPage } = useContext(ScrollContext)!;
  const [isLastChapter, setIsLastChapter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentRoute = usePathname();
  const isHome = currentRoute === '/';
  const isQuiz = /^\/quiz\/\d+(\/[^\/]+)?\/?$/.test(currentRoute);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const start = () => {
    const chapter = manifest.chapters[0];
    push(`/page/${chapter.id}/${chapter.slug}`);
    closeMenu();
  };

  const startScrolling = (scrollFunc: () => void) => {
    if (scrollIntervalRef.current !== null) {
      // scrollFunc ya se está ejecutando, no hacer nada
      return;
    }

    // Ejecutar scrollFunc cada 100ms
    scrollIntervalRef.current = setInterval(scrollFunc, 100);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current !== null) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopScrolling();
    };
  }, []);

  const exit = () => {
    push('/');
    closeMenu();
  };

  // funciones para botones de quiz
  const nextQuestion = () => {
    const steps = ['INTRO', 'QUESTION', 'RESULT'];
    const nextStep = steps[steps.indexOf(currentStep) + 1] as QuizProviderState;
    setCurrentStep(nextStep);
  };
  const RigthButtonTexts = {
    INTRO: 'iniciar quiz',
    QUESTION: 'Comprobar',
    RESULT: 'Siguiente',
  };
  const LeftButtonTexts = {
    INTRO: 'Saltar quiz',
    QUESTION: 'Saltar',
    RESULT: 'Repetir quiz',
  };

  // objetos de los botones de Quiz
  const leftButton: ButtonProps = {
    action: () => console.log('left button'),
    text: LeftButtonTexts[currentStep],
    state: 'outlined',
  };
  const RigthButton: ButtonProps = {
    action: () => nextQuestion(),
    text: RigthButtonTexts[currentStep],
  };

  useEffect(() => {
    if (params?.slug && parseInt(params?.slug[0]) === manifest.chapters.length) {
      setIsLastChapter(true);
    } else {
      setIsLastChapter(false);
    }
  }, [params?.slug]);

  useEffect(() => {
    stopScrolling();
  }, [currentStep, isQuiz, params]);

  return (
    <>
      <footer
        className={`${styles.footer} ${isHome && styles.homeNavigationFooter} ${
          isQuiz && styles.QuizNavigation
        } `}
      >
        <nav
          aria-label="Menú principal"
          role="navigation"
          className={`${styles.navigationMenu} ${menuOpen && styles.showTwoLeft} ${
            isLastChapter && styles.showTwoLeft
          } ${isHome && styles.homeNavigationMenu} ${isHome && menuOpen && styles.homeMenuOpen}`}
        >
          {!isQuiz && menuOpen && (
            <Button onClick={exit} red>
              SALIR
            </Button>
          )}
          {!isQuiz && !menuOpen && params?.slug && (
            <Button
              icon="back"
              onMouseDown={() => startScrolling(scrollUp)}
              onMouseUp={stopScrolling}
              onMouseLeave={stopScrolling}
              onTouchStart={() => startScrolling(scrollUp)}
              onTouchEnd={stopScrolling}
              onTouchCancel={stopScrolling}
              onBlur={stopScrolling}
              onClick={() => startScrolling(scrollUp)}
              ariaLabel="Regresar"
            ></Button>
          )}
          {!isQuiz && (
            <Button icon={menuOpen ? 'close' : 'menu'} ariaLabel="Menú" onClick={toggleMenu}>
              Menú
            </Button>
          )}
          {!isQuiz && !menuOpen && !params?.slug && (
            <Button icon="next" ariaLabel="Iniciar" onClick={start}>
              Iniciar
            </Button>
          )}
          {!isQuiz &&
            !menuOpen &&
            params?.slug &&
            parseInt(params?.slug[0]) < manifest.chapters.length && (
              <Button
                icon="next"
                onMouseDown={() => startScrolling(scrollDown)}
                onMouseUp={stopScrolling}
                onMouseLeave={stopScrolling}
                onTouchStart={() => startScrolling(scrollDown)}
                onTouchEnd={stopScrolling}
                onTouchCancel={stopScrolling}
                onBlur={stopScrolling}
                onClick={() => startScrolling(scrollDown)}
                ariaLabel="Siguiente"
              ></Button>
            )}
          {/* botones del quiz */}
          {isQuiz && (
            <QuizButtons
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              leftButton={leftButton}
              rightButton={RigthButton}
            />
          )}
        </nav>
      </footer>
      <BottomSheet isOpen={menuOpen} onClose={closeMenu}>
        <ul className={styles.menuList}>
          {manifest.chapters.map((chapter, i) => (
            <li
              key={i}
              className={`${styles.menuItem} ${
                params?.slug && parseInt(params?.slug[0]) === chapter.id && styles.active
              }`}
            >
              <Link href={`/page/${chapter.id}/${chapter.slug}`} onClick={closeMenu} prefetch>
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
};

export default Footer;
