export interface QuizQuestion {
  id: number;
  correctAnswerIndex: number;
  title: string;
  answers: string[];
}
export interface QuizData {
  hasQuiz: boolean;
  questions: QuizQuestion[];
}
export interface QuizViewProps {
  quizData: QuizData;
}
