import Image from "next/image";
import { EmailItemProps } from "../types";

export default function EmailItem({ 
  name,
  sender,
  subject,
  preview,
  time,
  onClick,
  isCompleted,
  attachment
}: EmailItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex gap-4 px-4 py-2 cursor-pointer hover:shadow-md border-b transition-all duration-200 ${
        isCompleted ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
        {name[0]}
      </div>
      <div className="min-w-0 flex-grow">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{name}</span>
          <span className="text-gray-500 text-sm ml-auto whitespace-nowrap">{time}</span>
        </div>
        <h3 className="text-sm font-medium truncate">{subject}</h3>
        <p className="text-sm text-gray-600 truncate flex items-center gap-2">
          {attachment && (
            <Image 
              src={attachment.icon}
              alt="Attachment icon"
              width={12}
              height={12}
              className="object-contain"
            />
          )}
          <span>{preview}</span>
        </p>
      </div>
    </div>
  );
}