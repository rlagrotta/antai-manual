'use client';

import React, { useContext } from 'react';
import QuizIntroComponent from '../QuizIntroComponent/QuizIntroComponent';
import QuizQuestionComponent from '../QuizQuestionComponent/QuizQuestionComponent';
import QuizResultComponent from '../QuizResultComponent/QuizResultComponent';
import { QuizContext, QuizContextProvider } from '@/contexts/QuizProvider';
import { QuizData } from './../../interfaces/Quiz';

export interface QuizViewProps {
  quizData: QuizData;
}

export default function QuizView({ quizData }: QuizViewProps) {
  const { currentStep, setQuizData, quizResultState } = useContext<QuizContextProvider | null>(
    QuizContext
  )!;
  console.log(quizData, 'quizData');
  setQuizData && setQuizData(quizData);
  const steps = {
    INTRO: <QuizIntroComponent />,
    QUESTION:
      quizData.hasQuiz && quizData.questions.length > 0 ? (
        <QuizQuestionComponent questionData={quizData.questions[0]} />
      ) : null,
    RESULT: <QuizResultComponent state={quizResultState} />,
  };

  return <div>{steps[currentStep]}</div>;
}
