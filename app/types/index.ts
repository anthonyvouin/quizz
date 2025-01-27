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


export type Email = {
  id: string;
  name: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlignment?: 'left' | 'center' | 'right';
  contentAlignment?: 'left' | 'center' | 'right';
  time: string;
  questionId: string;
  attachment?: {
    name: string;
    type: string;
    icon: string;
  };
};


export interface EmailItemProps {
  id: string;
  name: string;
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


