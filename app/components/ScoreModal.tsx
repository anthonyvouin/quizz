import { FiX } from "react-icons/fi";
import Link from "next/link";

interface ScoreModalProps {
  score: number;
  totalAnswered: number;
  onClose: () => void;
  onReplay: () => void;
}

export default function ScoreModal({ score, totalAnswered, onClose, onReplay }: ScoreModalProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Quiz de Sécurité Email',
        text: 'Testez vos connaissances en sécurité des emails avec ce quiz interactif !',
        url: window.location.href
      }).catch((error) => console.log('Erreur de partage', error));
    }
  };

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

        <div className="space-y-3 mt-6">
          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Partager
            </button>

            <Link
              href="/guide"
              className="flex-1 py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              Guide
            </Link>
          </div>

          <button
            onClick={onReplay}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
          >
            Rejouer
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            © 2025 - Conceptualisé par <a href="https://www.linkedin.com/in/anna-giraud" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-blue-500">Anna Giraud</a> et développé par <a href="https://anthony-vouin.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-blue-500">Anthony Vouin</a>
          </p>
        </div>
      </div>
    </div>
  );
} 