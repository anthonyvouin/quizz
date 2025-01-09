import { FiX } from "react-icons/fi";

interface IntroModalProps {
  onClose: () => void;
}

export default function IntroModal({ onClose }: IntroModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Bienvenue dans la Formation Sécurité</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX className="text-gray-600 text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          <p>
            Bienvenue dans notre simulation de sensibilisation 
            à la sécurité <br />des emails .
          </p>
          
          <p>
            Vous allez recevoir une série de 10 emails simulés. Votre mission est  d&apos;identifier 
            les emails potentiellement dangereux et de répondre correctement aux questions 
            de sécurité associées.
          </p>

          <p>
            Pour chaque email, lisez attentivement le contenu et cliquez sur 
            &quot;Répondre aux questions&quot; pour tester vos connaissances en matière de sécurité.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Commencer la formation
        </button>
      </div>
    </div>
  );
}