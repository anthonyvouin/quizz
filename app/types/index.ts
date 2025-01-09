export interface Question {
  question: string;
  explanation: string;
  isCorrect: boolean;
}

export interface QuizData {
  questions: {
    [key: string]: Question;
  };
} 