import React, { useContext, useState } from 'react';
import QuestionCard from '../QuestionCard/QuestionCard';
import QuestionText from '../QuestionText/QuestionText';
import styles from './QuizQuestionComponent.module.css';
import { QuizContext } from '@/contexts/QuizProvider';

import { QuizQuestion } from './../../interfaces/Quiz';

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
interface QuizQuestionProps {
  questionData: QuizQuestion;
}

export default function QuizQuestionComponent({ questionData }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const { setAnswerIndex } = useContext(QuizContext)!;
  console.log(questionData, 'questionData');
  return (
    <div className={styles.mainContainer}>
      <QuestionText pregunta={questionData.title} pista="" />
      {questionData.answers?.map((respuesta, index) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            key={index}
            onClick={() => {
              setSelected(index);
              if (setAnswerIndex) setAnswerIndex(index);
            }}
          >
            <QuestionCard
              letter={letters[index]}
              mainText={respuesta}
              secondaryText=""
              state={selected === index ? 'selected' : 'default'}
            />
          </div>
        );
      })}
    </div>
  );
}
