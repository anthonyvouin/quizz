import { FiArrowLeft, FiStar, FiArchive, FiTrash2, FiMail, FiPrinter, FiMoreVertical } from "react-icons/fi";
import { BiReply, BiRightArrowAlt } from "react-icons/bi";

interface EmailViewProps {
  email: {
    sender: string;
    subject: string;
    content: string;
    time: string;
  };
  onClose: () => void;
  onStartQuiz: () => void;
}

export default function EmailView({ email, onClose, onStartQuiz }: EmailViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header avec les actions */}
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
          <button 
            onClick={onStartQuiz}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Répondre aux questions
          </button>
        </div>

        {/* Sujet de l'email */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">{email.subject}</h1>
        </div>

        {/* Informations de l'expéditeur et actions */}
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

        {/* Contenu de l'email */}
        <div className="flex-grow p-6 overflow-auto">
          <div className="max-w-3xl">
            {email.content.split('\n').map((paragraph, index) => (
              <p key={index} className={`${paragraph.trim() === '' ? 'h-4' : 'mb-4'} text-gray-800`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Actions en bas */}
        <div className="p-4 border-t flex gap-2">
          <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2">
            <BiReply className="text-gray-600" />
            <span>Répondre</span>
          </button>
          <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2">
            <BiRightArrowAlt className="text-gray-600" />
            <span>Transférer</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
            <FiPrinter className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FiMoreVertical className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
} 