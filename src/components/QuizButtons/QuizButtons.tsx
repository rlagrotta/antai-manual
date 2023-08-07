import React, { useContext } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';

import { ScrollContext } from '@/contexts/ScrollContext';
import { QuizProviderState, QuizContext } from '@/contexts/QuizProvider';
import manifest from './../../json/manifest.json';
import styles from './QuizButtons.module.css';
import { Button } from '../Button';

interface butonStates {
  state: 'disabled' | 'red' | 'outlined' | undefined;
}

type stepType = 'INTRO' | 'QUESTION' | 'RESULT';

export interface ButtonProps {
  action: () => void;
  text: string;
  state?: butonStates['state'];
}
interface QuizButtonsProps {
  currentStep: stepType;
  setCurrentStep: (step: stepType) => void;
  leftButton: ButtonProps;
  rightButton: ButtonProps;
}
export default function QuizButtons({
  currentStep,
  setCurrentStep,
  leftButton,
  rightButton,
}: QuizButtonsProps) {
  const { push } = useRouter();
  const params = useParams();
  const currentChapter = parseInt(params?.slug[0]);
  const chapter = manifest.chapters.find(c => c.id === currentChapter - 1);
  const { checkAnswer, setAnswerIndex } = useContext(QuizContext)!;
  const { nextPage } = useContext(ScrollContext)!;

  const leftButtonAction = () => {
    if (currentStep === 'INTRO' || currentStep === 'QUESTION') {
      skipQuiz();
    }

    if (currentStep === 'RESULT') {
      setCurrentStep('QUESTION');
      if (setAnswerIndex) setAnswerIndex(-1);
    }
  };

  const rightButtonAction = () => {
    if (currentStep === 'INTRO') {
      startQuiz();
    }

    if (currentStep === 'QUESTION') {
      if (checkAnswer) checkAnswer();
    }
    if (currentStep === 'RESULT') {
      nextPage();
      setTimeout(() => {
        if (setAnswerIndex) setAnswerIndex(-1);
        setCurrentStep('INTRO');
      }, 250);
    }
  };

  const skipQuiz = () => {
    const nextChapter = manifest.chapters.find(c => c.id === currentChapter + 1);
    if (!nextChapter) {
      push('/');
      return;
    }
    push(`/page/${nextChapter.id}/${nextChapter.slug}`);
  };

  const startQuiz = () => {
    const steps = ['INTRO', 'QUESTION', 'RESULT'];
    const nextStep = steps[steps.indexOf(currentStep) + 1] as QuizProviderState;
    setCurrentStep(nextStep);
  };

  const buttonStates = (state: 'disabled' | 'red' | 'outlined' | undefined | string) => {
    if (!state) {
      return {};
    }
    return {
      outlined: state === 'outlined',
      red: state === 'red',
      disabled: state === 'disabled',
    };
  };

  return (
    <div className={styles.buttonsContainer}>
      <Button onClick={leftButtonAction} {...buttonStates(leftButton.state)}>
        <span className={styles.butonText}>{leftButton.text}</span>
      </Button>
      <Button onClick={rightButtonAction} {...buttonStates(rightButton.state)}>
        <span className={styles.butonText}>{rightButton.text}</span>
      </Button>
    </div>
  );
}
