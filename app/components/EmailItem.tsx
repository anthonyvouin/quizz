import Image from "next/image";

interface EmailItemProps {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  onClick: () => void;
  isCompleted?: boolean;
  attachment?: {
    name: string;
    type: string;
    icon: string;
  };
}

export default function EmailItem({ 
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
      className={`flex items-center px-4 md:px-8 py-2 hover:bg-gray-100 cursor-pointer ${
        isCompleted ? 'opacity-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0 pl-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold truncate">{sender}</span>
          <span className="text-sm text-gray-600 whitespace-nowrap ml-2 min-w-[45px] text-right">
            {time}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {attachment && (
            <Image 
              src={attachment.icon}
              alt="Attachment"
              width={16}
              height={16}
              className="object-contain flex-shrink-0"
            />
          )}
          <h3 className="text-sm font-medium truncate">{subject}</h3>
        </div>
        <p className="text-sm text-gray-600 truncate">{preview}</p>
      </div>
    </div>
  );
}