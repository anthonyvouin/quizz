import Image from 'next/image';

interface EmailContentProps {
  content: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlignment?: 'left' | 'center' | 'right';
  contentAlignment?: 'left' | 'center' | 'right';
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
  contentAlignment = 'left',
  attachment
}) => {
  const renderParagraph = (paragraph: string, index: number, isSmallText: boolean) => {
    if (paragraph === 'Ce mail a été certifié par Google') {
      return (
        <div key={index}>
          <p className="mb-4 bg-green-800 text-white p-3 rounded-md w-full max-w-2xl">
            {paragraph}
          </p>
        </div>
      );
    }
    
    if (paragraph === 'Découvrez le Pass Sécurité' || paragraph === 'Le non-respect des règles peut entraîner une perte de 3 points sur votre permis de conduire, ainsi que d\'autres sanctions possibles.') {
        return (
          <p key={index} className="mb-4 text-red-500 font-bold">
            {paragraph}
          </p>
        );
      }

      if (paragraph === 'Cliquez ici pour activer ce service') {
        return (
          <div key={index}>
            <p className="mb-4  bg-blue-500 text-white p-3 rounded-md text-center max-w-md mx-auto cursor-pointer">
              {paragraph}
            </p>
          </div>
        );
      }
      if (paragraph === 'Répondre au sondage') {
        return (
          <div key={index}>
            <p className="mb-4 bg-cyan-500 text-white px-4 py-2 rounded-md w-52 cursor-pointer">
              {paragraph}
            </p>
          </div>
        );
      }

      if (paragraph === 'Régler l\'amende') {
        return (
          <div key={index}>
            <p className="text-center">
              {paragraph}
            </p>
          </div>
        );
      }


      if (paragraph.includes('139,27 euros à 375 euros')) {
        const parts = paragraph.split(/(139,27 euros à 375 euros)/);
        return (
          <p key={index} className="mb-4">
            {parts.map((part, i) => 
              part === '139,27 euros à 375 euros' ? 
                <span key={i} className="font-bold">{part}</span> : 
                <span key={i}>{part}</span>
            )}
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

    if (paragraph.includes('{{')) {
      const parts = paragraph.split(/(\{\{.*?\}\})/);
      if (parts.some(part => part.includes('Régler l\'amende'))) {
        return (
          <div key={index} className="flex justify-center w-full">
            <p className="text-blue-500 underline cursor-pointer text-center">
              Régler l'amende
            </p>
          </div>
        );
      }
      return (
        <p key={index} className={`mb-4 ${isSmallText ? 'text-xs text-gray-500' : ''}`}>
          {parts.map((part, i) => {
            if (part.startsWith('{{') && part.endsWith('}}')) {
              const linkText = part.slice(2, -2);
              if (linkText === 'small') return null;
              return (
                <span 
                  key={`link-${i}`}
                  className="text-blue-500 underline cursor-pointer"
                >
                  {linkText}
                </span>
              );
            }
            return <span key={`text-${i}`}>{part}</span>;
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
          <div key="attachment">
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
    <div className={`max-w-3xl ${contentAlignment === 'center' ? 'lg:ml-[calc(50%-540px)]' : ''}`}>
      {renderContent()}
    </div>
  );
};

export default EmailContent; 