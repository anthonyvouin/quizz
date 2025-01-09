import { FiX } from "react-icons/fi";

interface ScoreModalProps {
  score: number;
  totalAnswered: number;
  onClose: () => void;
  onReplay: () => void;
}

export default function ScoreModal({ score, totalAnswered, onClose, onReplay }: ScoreModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full invisible"
            >
              <FiX className="text-gray-600 text-xl" />
            </button>
          </div>
          <h2 className="text-2xl font-semibold">Félicitations !</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX className="text-gray-600 text-xl" />
          </button>
        </div>

        <div className="text-center space-y-4">
          <p className="text-xl text-gray-700 mb-2">
            Vous avez obtenu le score de
          </p>
          <div className="text-6xl font-bold text-blue-500">
            {score}/{totalAnswered}
          </div>
          <p className="text-gray-600">
            {score === totalAnswered 
              ? "Excellent ! Vous maîtrisez parfaitement les concepts de sécurité."
              : "Continuez à vous former pour améliorer vos connaissances en sécurité."}
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Fermer
          </button>
          <button
            onClick={onReplay}
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
} 