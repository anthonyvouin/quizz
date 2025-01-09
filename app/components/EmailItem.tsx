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
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold truncate">{sender}</span>
          <span className="text-sm text-gray-600 whitespace-nowrap ml-2 min-w-[45px] text-right">
            {time}
          </span>
        </div>
        <h3 className="text-sm font-medium truncate">{subject}</h3>
        <p className="text-sm text-gray-600 truncate">{preview}</p>
      </div>
    </div>
  );
}