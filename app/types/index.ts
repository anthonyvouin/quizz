export interface Question {
  id: string;
  question: string;
  explanation: string;
  isCorrect: boolean;
}

export interface QuizData {
  quizzes: {
    [key: string]: {
      questions: Question[];
    };
  };
} 