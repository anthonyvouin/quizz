import { FiX } from "react-icons/fi";

interface QuizQuestion {
  question: string;
  explanation: string;
  isCorrect: boolean;
}

interface QuizModalProps {
  question: QuizQuestion;
  onClose: () => void;
  userAnswer: boolean | null;
  showResult: boolean;
  onAnswerSubmit: (answer: boolean) => void;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  totalAnswered: number;
}


export default function QuizModal({ 
  question, 
  onClose, 
  userAnswer, 
  showResult, 
  onAnswerSubmit,
  currentQuestion,
  totalQuestions,
  score,
  totalAnswered
}: QuizModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Question de Sécurité</h2>
            <div className="text-sm text-gray-500">
              <p>Question {currentQuestion} sur {totalQuestions}</p>
              <p>Score Global : {score} bonnes réponses sur {totalAnswered} questions</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX className="text-gray-600 text-xl" />
          </button>
        </div>

        <p className="text-lg mb-6">{question.question}</p>

        {!showResult ? (
          <div className="space-y-4">
            <button
              onClick={() => onAnswerSubmit(true)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Vrai
            </button>
            <button
              onClick={() => onAnswerSubmit(false)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Faux
            </button>
          </div>
        ) : (
          <div className={`p-4 rounded-lg mb-4 ${userAnswer === question.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="font-semibold mb-2">
              {userAnswer === question.isCorrect ? 
                `✅ Correct! | Score Global : ${score}/${totalAnswered}` : 
                `❌ Incorrect! | Score Global : ${score}/${totalAnswered}`
              }
            </p>
            <p>{question.explanation}</p>
            <button
              onClick={onClose}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {currentQuestion === totalQuestions ? 'Terminer' : 'Question suivante'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 