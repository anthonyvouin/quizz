import Image from 'next/image';

interface EmailContentProps {
  content: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlignment?: 'left' | 'center' | 'right';
  attachment?: {
    name: string;
    type: string;
    icon: string;
  };
}

const EmailContent: React.FC<EmailContentProps> = ({
  content,
  image,
  imageWidth = 200,
  imageHeight = 100,
  imageAlignment = 'left',
  attachment
}) => {
  const renderParagraph = (paragraph: string, index: number, isSmallText: boolean) => {
    if (paragraph === 'Ce mail a été certifié par Google') {
      return (
        <p key={index} className="mb-4 bg-green-800 text-white p-3 rounded-md w-full">
          {paragraph}
        </p>
      );
    }

    if (paragraph.includes('{{IMAGE}}')) {
      return (
        <div key={index} className="my-4">
          {image && (
            <div className={`flex ${
              imageAlignment === 'center' ? 'justify-center' :
              imageAlignment === 'right' ? 'justify-end' : 'justify-start'
            }`}>
              <Image 
                src={image} 
                alt="Email image"
                width={imageWidth}
                height={imageHeight}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      );
    }

    // Gestion des liens
    if (paragraph.includes('{{')) {
      const parts = paragraph.split(/(\{\{.*?\}\})/);
      return (
        <p key={index} className={`mb-4 ${isSmallText ? 'text-xs text-gray-500' : ''}`}>
          {parts.map((part, i) => {
            if (part.startsWith('{{') && part.endsWith('}}')) {
              const linkText = part.slice(2, -2);
              if (linkText === 'small') return null;
              return (
                <span 
                  key={i} 
                  className="text-blue-500 underline cursor-pointer"
                >
                  {linkText}
                </span>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    }

    if (paragraph.includes('•')) {
      return (
        <div key={index} className="mb-4">
          {paragraph.split('\n').map((line, lineIndex) => (
            <p key={lineIndex} className={`mb-1 ${isSmallText ? 'text-xs text-gray-500' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      );
    }

    return (
      <p key={index} className={`mb-4 ${isSmallText ? 'text-xs text-gray-500' : ''}`}>
        {paragraph}
      </p>
    );
  };

  const renderContent = () => {
    let isSmallText = false;
    return (
      <>
        {attachment && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3 max-w-fit cursor-pointer hover:bg-gray-100">
            <Image 
              src={attachment.icon}
              alt="Attachment icon"
              width={20}
              height={20}
              className="object-contain"
            />
            <div>
              <p className="font-medium text-sm text-gray-900">{attachment.name}</p>
              <p className="text-xs text-gray-500">Cliquez pour ouvrir</p>
            </div>
          </div>
        )}
        {content.split('\n\n').map((paragraph, index) => {
          if (paragraph.includes('{{small}}')) {
            isSmallText = true;
            paragraph = paragraph.replace('{{small}}', '');
          }
          if (paragraph.includes('{{small}}')) {
            isSmallText = false;
            paragraph = paragraph.replace('{{small}}', '');
          }
          return renderParagraph(paragraph, index, isSmallText);
        })}
      </>
    );
  };

  return (
    <div className="max-w-3xl">
      {renderContent()}
    </div>
  );
};

export default EmailContent; 