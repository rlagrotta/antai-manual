'use client';
import AnswerResultBadge from '@/components/AnswerResultBadge/AnswerResultBadge';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import QuestionText from '@/components/QuestionText/QuestionText';
import QuizButtons, { ButtonProps } from '@/components/QuizButtons/QuizButtons';
import QuizResultBadge from '@/components/QuizResultBadge/QuizResultBadge';
import React, { useState } from 'react';

export default function Page() {
  const [showBadge, setShowBadge] = useState(false);
  const [showBadge2, setShowBadge2] = useState(false);
  const [questionCardState, setQuestionCardState] = useState<
    'success' | 'error' | 'selected' | 'default'
  >('default');

  const leftButton: ButtonProps = {
    action: () => setShowBadge(true),
    text: 'Saltar quiz',
    state: 'outlined',
  };
  const rightButton: ButtonProps = {
    action: () => setShowBadge2(true),
    text: 'Iniciar quiz',
  };

  const randomState = () => {
    const randomNumber = (Math.random() * 3 + 1).toFixed(0);
    const randomState =
      randomNumber === '1'
        ? 'success'
        : randomNumber === '2'
        ? 'error'
        : randomNumber === '3'
        ? 'selected'
        : 'default';
    return randomState;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <QuizButtons leftButton={leftButton} rightButton={rightButton} />
      <QuestionCard
        letter="A"
        mainText="Lorem Ipsum"
        secondaryText="Dolo sit amet"
        state="success"
      />
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div onClick={() => setQuestionCardState(randomState)}>
        <QuestionCard
          letter="B"
          mainText="Lorem Ipsum"
          secondaryText="Dolo sit amet"
          state={randomState()}
        />
      </div>
      <QuestionCard letter="B" mainText="Lorem Ipsum" secondaryText="Dolo sit amet" />
      <QuestionCard letter="B" mainText="Lorem Ipsum" secondaryText="Dolo sit amet" state="error" />
      <QuestionText pregunta="¿Pregunta?" pista="Pista" />
      <QuizResultBadge state="success" correctAnswers={5} totalQuestions={7} />
      <QuizResultBadge state="error" correctAnswers={5} totalQuestions={7} />
      <AnswerResultBadge show={showBadge} setShow={setShowBadge} state="correct" />
      <AnswerResultBadge show={showBadge2} setShow={setShowBadge2} state="incorrect" />
    </div>
  );
}
