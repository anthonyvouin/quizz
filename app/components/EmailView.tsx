import { FiArrowLeft, FiStar, FiArchive, FiTrash2, FiMail, FiPrinter, FiMoreVertical, FiX } from "react-icons/fi";
import { BiReply, BiRightArrowAlt } from "react-icons/bi";

interface EmailViewProps {
  email: {
    sender: string;
    subject: string;
    content: string;
    time: string;
  };
  onClose: () => void;
  currentQuestion: number;
  totalQuestions: number;
  question: any;
  onAnswerSubmit: (answer: boolean) => void;
  showResult: boolean;
  userAnswer: boolean | null;
  globalScore: number;
  totalQuestionsAnswered: number;
}

export default function EmailView({ 
  email, 
  onClose,
  currentQuestion,
  totalQuestions,
  question,
  onAnswerSubmit,
  showResult,
  userAnswer,
  globalScore,
  totalQuestionsAnswered
}: EmailViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full z-50"
        >
          <FiX className="text-gray-600 text-xl" />
        </button>

        <div className="p-2 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <FiArrowLeft className="text-gray-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiArchive className="text-gray-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiTrash2 className="text-gray-600 text-xl" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiMail className="text-gray-600 text-xl" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">{email.subject}</h1>
        </div>

        <div className="p-4 border-b flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {email.sender[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{email.sender}</span>
                <span className="text-sm text-gray-500">&lt;{email.sender.toLowerCase().replace(/\s+/g, '.')}@entreprise.com&gt;</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>à moi</span>
                <FiMoreVertical className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{email.time}</span>
            <FiStar className="text-gray-400 cursor-pointer hover:text-yellow-400" />
          </div>
        </div>

        <div className="flex-grow p-6 overflow-auto">
          <div className="max-w-3xl">
            {email.content.split('\n').map((paragraph, index) => (
              <p key={index} className={`${paragraph.trim() === '' ? 'h-4' : 'mb-4'} text-gray-800`}>
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="h-16"></div>
        </div>

        <div className="mb-16"></div>

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-blue-100 rounded-lg px-4 py-2">
                <p className="text-blue-800 font-medium">
                  Score Global : {globalScore} / {totalQuestionsAnswered} questions
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">
                  Question {currentQuestion} sur {totalQuestions}
                </p>
                <p className="text-sm mb-2">{question.question}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAnswerSubmit(true)}
                    disabled={showResult}
                    className={`px-4 py-2 rounded text-sm font-medium ${
                      showResult 
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    Vrai
                  </button>
                  <button
                    onClick={() => onAnswerSubmit(false)}
                    disabled={showResult}
                    className={`px-4 py-2 rounded text-sm font-medium ${
                      showResult 
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    Faux
                  </button>
                </div>
                {showResult && (
                  <div className="mt-2">
                    <p className={`text-sm ${userAnswer === question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 