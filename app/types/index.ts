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


export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  questionId: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  attachment?: {
    name: string;
    type: string;
    icon: string;
  };
}


export interface EmailItemProps {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  onClick: () => void;
  isCompleted?: boolean;
  attachment?: {
    name: string;
    type: string;
    icon: string;
  };
}


