import QuizLayout from '@/components/QuizLayout/QuizLayout';
import React from 'react';
interface props {
  children: React.ReactNode;
}
export default function layout({ children }: props) {
  return <QuizLayout>{children}</QuizLayout>;
}
