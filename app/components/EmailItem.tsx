import Image from "next/image";
import { EmailItemProps } from "../types";

const EmailItem: React.FC<EmailItemProps> = ({
  name,
  sender,
  subject,
  preview,
  time,
  onClick,
  isCompleted,
  attachment
}) => {
  return (
    <div 
      onClick={onClick}
      className={`flex gap-4 px-4 py-2 cursor-pointer hover:bg-gray-50 ${
        isCompleted ? 'opacity-50' : ''
      }`}
    >
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white font-medium text-sm">{name[0]}</span>
      </div>
      <div className="min-w-0 flex-grow">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-medium text-sm truncate text-gray-900">{name}</span>
          <span className="text-gray-500 text-xs whitespace-nowrap ml-4">{time}</span>
        </div>
        <h3 className="text-sm font-medium truncate mb-1 text-gray-800">{subject}</h3>
        {attachment ? (
          <div className="space-y-1.5">
            <div className="text-sm text-gray-500 truncate">{preview}</div>
            <div className="flex items-center gap-2 text-sm bg-gray-50 px-2 py-1 rounded-md max-w-fit">
              <Image 
                src={attachment.icon}
                alt="Attachment icon"
                width={13}
                height={13}
                className="object-contain opacity-75 flex-shrink-0"
              />
              <span className="truncate max-w-[240px] text-gray-700">{attachment.name}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 truncate">{preview}</div>
        )}
      </div>
    </div>
  );
};

export default EmailItem;