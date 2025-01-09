import { AiOutlineStar } from "react-icons/ai";

interface EmailItemProps {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  onClick: () => void;
  isCompleted?: boolean;
}

export default function EmailItem({ 
  sender, 
  subject, 
  preview, 
  time, 
  onClick,
  isCompleted 
}: EmailItemProps) {
  return (
    <div 
      className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
        isCompleted ? 'opacity-50' : ''
      }`}
      onClick={onClick}
    >
      <input 
        type="checkbox" 
        className="w-4 h-4 mr-4"
        onClick={(e) => e.stopPropagation()} 
      />
      
      <AiOutlineStar 
        className="text-gray-400 mr-4"
        onClick={(e) => e.stopPropagation()}
      />
      
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span className="font-medium">{sender}</span>  
          <span className="text-gray-600">- {subject}</span> 
        </div>
        <p className="text-gray-600 text-sm truncate">{preview}</p> 
      </div>
      
      <span className="text-sm text-gray-600">{time}</span>
      {isCompleted && (
        <span className="text-green-500 text-sm ml-2">
          ✓ Complété
        </span>
      )}
    </div>
  );
}