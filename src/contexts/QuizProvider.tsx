import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

import manifest from '@/json/manifest.json';

import { QuizData } from '@/interfaces/Quiz';

export interface QuizContextProvider {
  currentStep: 'INTRO' | 'QUESTION' | 'RESULT';
  setCurrentStep: Dispatch<SetStateAction<'INTRO' | 'QUESTION' | 'RESULT'>>;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  totalQuestions: number;
  setTotalQuestions: Dispatch<SetStateAction<number>>;
  quizTitle: string;
  setQuizTitle: Dispatch<SetStateAction<string>>;
  checkAnswer?: () => void;
  answerIndex?: number;
  setAnswerIndex?: Dispatch<SetStateAction<number>>;
  setQuizData?: Dispatch<SetStateAction<QuizData | undefined>>;
  quizResultState?: 'SUCCESS' | 'FAILURE';
}

export const QuizContext = createContext<QuizContextProvider | null>(null);

interface QuizProviderProps {
  children: React.ReactNode;
}

export type QuizProviderState = 'INTRO' | 'QUESTION' | 'RESULT';

export default function QuizProvider({ children }: QuizProviderProps) {
  const [currentStep, setCurrentStep] = useState<QuizProviderState>('INTRO');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [answerIndex, setAnswerIndex] = useState<number>(0);
  const [quizTitle, setQuizTitle] = useState<string>('QUIZ');
  const [quizData, setQuizData] = useState<QuizData>();
  const [quizResultState, setQuizResultState] = useState<'SUCCESS' | 'FAILURE'>('SUCCESS');

  const checkAnswer = () => {
    if (quizData?.questions[currentQuestion].correctAnswerIndex === answerIndex) {
      setQuizResultState('SUCCESS');
      setCurrentStep('RESULT');
    } else {
      setQuizResultState('FAILURE');
      setCurrentStep('RESULT');
    }
  };

  return (
    <QuizContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentQuestion,
        setCurrentQuestion,
        totalQuestions,
        setTotalQuestions,
        quizTitle,
        setQuizTitle,
        answerIndex,
        setAnswerIndex,
        checkAnswer,
        setQuizData,
        quizResultState,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
