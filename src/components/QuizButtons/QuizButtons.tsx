import React from 'react';
import { Button } from '../Button';
import styles from './QuizButtons.module.css';

interface butonStates {
  state: 'disabled' | 'red' | 'outlined' | undefined;
}

export interface ButtonProps {
  action: () => void;
  text: string;
  state?: butonStates['state'];
}
interface QuizButtonsProps {
  leftButton: ButtonProps;
  rightButton: ButtonProps;
}
export default function QuizButtons({ leftButton, rightButton }: QuizButtonsProps) {
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
      <Button onClick={leftButton.action} {...buttonStates(leftButton.state)}>
        <span className={styles.butonText}>{leftButton.text}</span>
      </Button>
      <Button onClick={rightButton.action} {...buttonStates(rightButton.state)}>
        <span className={styles.butonText}>{rightButton.text}</span>
      </Button>
    </div>
  );
}
