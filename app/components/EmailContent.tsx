import Image from 'next/image';

interface EmailContentProps {
  content: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlignment?: 'left' | 'center' | 'right';
  contentAlignment?: 'left' | 'center' | 'right';
  textAlignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  attachment?: {
    name: string;
    type: string;
    icon: string;
  };
  sender?: string;
}

// Composant qui gère l'affichage du contenu des emails avec différents styles et formatages
const EmailContent: React.FC<EmailContentProps> = ({
  content,
  image,
  imageWidth = 200,
  imageHeight = 100,
  imageAlignment = 'left',
  contentAlignment = 'left',
  textAlignment = 'left',
  backgroundColor,
  attachment,
  sender
}) => {

  // Fonction qui gère le rendu de chaque paragraphe selon son contenu
  const renderParagraph = (paragraph: string, index: number, isSmallText: boolean) => {
    // Style spécial pour le message de certification Google (fond vert)
    if (paragraph === 'Ce mail a été certifié par Google') {
      return (
        <div key={index}>
          <p className="mb-4 bg-green-800 text-white p-3 rounded-md w-full max-w-2xl">
            {paragraph}
          </p>
        </div>
      );
    }
    
    // Style pour les messages d'alerte (texte rouge en gras)
    if (paragraph === 'Découvrez le Pass Sécurité' ||
       paragraph === 'Le non-respect des règles peut entraîner une perte de 3 points sur votre permis de conduire, ainsi que d\'autres sanctions possibles.' 
   ) {
        return (
          <p key={index} className="mb-4 text-red-500 font-bold">
            {paragraph}
          </p>
        );
      }

      if ( paragraph === 'Des frais de livraison peuvent s\'appliquer') {
         return (
           <p key={index} className="mb-4 text-red-500 font-bold text-center">
             {paragraph}
           </p>
         );
       }


       if ( paragraph === 'LIVRAISON DU COLIS SUSPENDU !') {
        return (
          <p key={index} className="mb-4 text-center font-bold text-lg">
            {paragraph}
          </p>
        );
      }

 

      if (paragraph === 'Planifier La Livraison Maintenant') {
        return (
          <div key={index}>
            <p className="mb-4  bg-red-500 text-white p-3 rounded-md text-center max-w-md mx-auto cursor-pointer  ">
              {paragraph}
            </p>
          </div>
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

      // Style pour le bouton de sondage (fond cyan)
      if (paragraph === 'Répondre au sondage') {
        return (
          <div key={index}>
            <p className="mb-4 bg-cyan-500 text-white px-4 py-2 rounded-md w-52 cursor-pointer">
              {paragraph}
            </p>
          </div>
        );
      }

      // Style pour le bouton de règlement d'amende (centré)
      if (paragraph === 'Régler l\'amende' ) {
        return (
          <div key={index}>
            <p className="text-center">
              {paragraph}
            </p>
          </div>
        );
      }

      // Style spécial pour les montants d'amende (texte en gras)
      if (paragraph.includes('139,27 euros à 375 euros' ) ) {
        const pattern = /(139,27 euros à 375 euros)/;
        const parts = paragraph.split(pattern);
        return (
          <p key={index} className="mb-4">
            {parts.map((part, i) => 
              part === '139,27 euros à 375 euros'? 
                <span key={i} className="font-bold">{part}</span> : 
                <span key={i}>{part}</span>
            )}
          </p>
        );
      }

    if (paragraph.includes('{{IMAGE}}')) {
      const isHostingerEmail = content.includes('Votre mot de passe a été modifié avec succès');
      return (
        <div key={index} className={`my-4 flex flex-col md:flex-row items-center ${
          imageAlignment === 'center' ? 'justify-center' :
          imageAlignment === 'right' ? 'justify-end' : 'justify-start'
        }`}>
          {image && (
            <Image 
              src={image} 
              alt="Email image"
              width={imageWidth}
              height={imageHeight}
              className="rounded-lg"
            />
          )}
          {isHostingerEmail && <span className="text-[#673DE6] text-2xl font-semibold mt-4 ml-4 md:mt-0 md:ml-80">Trois. Deux. En ligne</span>}
        </div>
      );
    }

    if (paragraph === 'Trois. Deux. En ligne') {
      const isHostingerEmail = content.includes('Votre mot de passe a été modifié avec succès');
      return isHostingerEmail ? null : (
        <p key={index} className="text-[#673DE6] mb-4 font-semibold">
          {paragraph}
        </p>
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
        <p key={index} className={`mb-4 ${isSmallText ? 'text-xs text-gray-500' : ''} text-${textAlignment}`}>
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

    if (paragraph.includes('Nous sommes à l\'écoute !' ) ) {
      return (
        <h1 key={index} className="text-2xl font-bold text-center my-6">
          {paragraph}
        </h1>
      );
    }

    if (paragraph.includes('SHEIN Boîte mystère')) {
      return (
        <h2 key={index} className="text-xl font-semibold text-center my-4">
          {paragraph}
        </h2>
      );
    }

 
    if (paragraph.includes('Les commentaires des clients')) {
      return (
        <p key={index} className="text-gray-700 text-center my-4 max-w-2xl mx-auto">
          {paragraph}
        </p>
      );
    }

    if (paragraph.includes('Se connecter')) {
      return (
        <p key={index} className="bg-[#673DE6] text-white p-3 mb-4 rounded-md cursor-pointer inline-block">
          {paragraph}
        </p>
      );
    }

    if (paragraph.includes('Votre mot de passe a été modifié avec succès')) {
      return (
        <p key={index} className="font-bold text-4xl mb-4 text-[#2f1c69]">
          {paragraph}
        </p>
      );
    }

    if (paragraph.includes('Ce message a été envoyé par Carrefour')) {
      return (
        <p key={index} className="bg-green-100 ">
          {paragraph}
        </p>
      );
    }



    if (paragraph.includes('Cliquez ici pour répondre')) {
      return (
        <p key={index} className="text-center my-4 max-w-2xl mx-auto font-medium">
          {paragraph}
        </p>
      );
    }

    if (paragraph.includes('Désabonnez-vous')) {
      return (
        <div key={index} className="mt-8 pt-4 border-t border-gray-200 flex flex-col items-center">
          <p className="text-xs text-gray-500 text-center w-full">
            {paragraph}
          </p>
        </div>
      );
    }

    if (paragraph.includes('COMMENCEZ C\'EST GRATUIT !')) {
      return (
        <div key={index} className="flex justify-center w-full my-6">
          <button className="bg-black  text-white px-8 py-4 rounded-md text-lg font-medium transition-colors  cursor-pointer text-center">
            COMMENCEZ C'EST GRATUIT !
          </button>
        </div>
      );
    }

    if (paragraph.includes('En profiter')) {
      const isBoulangerEmail = content.includes('Les Soldes continuent');
      if (isBoulangerEmail) {
        return (
          <div key={index} className="flex justify-center w-full my-4">
            <button className="bg-[#E1000F] text-white px-8 py-3 rounded-full text-lg font-medium cursor-pointer text-center hover:bg-red-700">
              En profiter
            </button>
          </div>
        );
      }
    }

    if (paragraph.includes('Les Soldes continuent')) {
      return (
        <div key={index} className="text-center mb-6">
          <p className="text-lg mb-2">{paragraph}</p>
        </div>
      );
    }

    if (paragraph.startsWith('#Christine')) {
      return (
        <p key={index} className="text-2xl font-semibold text-center mb-4">
          {paragraph.replace('#', '')}
        </p>
      );
    }

    if (paragraph === 'METTEZ À JOUR LE MODE DE PAIEMENT' || paragraph === 'METTRE À JOUR LE MODE DE PAIEMENT MAINTENANT') {
      return (
        <div key={index} className="flex justify-center w-full mb-4">
          <button className="bg-[#008374] hover:bg-[#006d61] text-white px-6 py-2.5 rounded text-sm font-medium cursor-pointer transition-colors duration-200">
            {paragraph}
          </button>
        </div>
      );
    }

    if (paragraph === '⚠️ Votre abonnement sera annulé') {
      return (
        <div key={index} className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-gray-100 p-3 flex items-center gap-2 mb-4">
          <div className="max-w-3xl mx-auto w-full flex items-center gap-2 px-4">
            <span className="text-yellow-600">⚠️</span>
            <span className="text-[15px] font-semibold lg:text-lg">Votre abonnement sera annulé</span>
          </div>
        </div>
      );
    }

    if (paragraph === 'Détails de la transaction') {
      return (
        <p key={index} className="text-3xl font-bold mb-4 text-center">
          {paragraph}
        </p>
      );
    }

    if (paragraph === 'Vous me voyez pas l\'argent sur votre compte ?') {
      return (
        <p key={index} className="font-bold text-center mt-4 mb-4 text-xl">
          {paragraph}
        </p>
      );
    }

   

    if (paragraph.includes('Aide et Contact | Sécurité | À propos')) {
      return (
        <div key={index} className="mt-8 text-center text-sm text-blue-600 mb-4" >
          {paragraph.split('|').map((item, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">|</span>}
              <a href="#" className="hover:underline">{item.trim()}</a>
            </span>
          ))}
        </div>
      );
    }

    if (paragraph.includes('PayPal (Europe)')) {
      return (
        <p key={index} className="text-xs text-gray-500 text-center mt-4">
          {paragraph}
        </p>
      );
    }
    if (paragraph.includes('Bonjour Madame, Monsieur')) {
      return (
        <p key={index} className="text-2xl font-bold text-yellow-400  mt-4
        mb-4">
          {paragraph}
        </p>
      );
    }

    if (paragraph.includes('Répondre au questionnaire >')) {
      return (
        <div key={index} className="flex justify-center w-full my-6">
          <button className="text-xl font-semibold bg-yellow-400 text-white px-8 py-4 rounded-sm hover:bg-yellow-500 cursor-pointer max-w-md">
            {paragraph}
          </button>
        </div>
      );
    }

    if (paragraph.includes('Donner votre avis permet d\'améliorer nos services.')) {
      return (
        <div key={index} className="flex justify-center w-full my-6">
          <button className="text-lg font-semibold text-yellow-500 ">
            {paragraph}
          </button>
        </div>
      );
    }

    if (paragraph.includes('Pour votre sécurité, ne répondez jamais à un courriel vous demandant votre numéro de carte bancaire.')) {
      return (
        <div key={index} className="bg-gray-300">
            {paragraph}
        </div>
      );
    }

    if (paragraph.includes('Statut : Arrêté au centre de distribution (frais de douane impayés)')) {
      return (
        <div key={index} className="text-center font-semibold text-lg mb-4 ">
            {paragraph}
        </div>
      );
    }

 

   

    return (
      <p key={index} className={`mb-4 ${isSmallText ? 'text-xs text-gray-500' : ''} text-${textAlignment}`}>
        {paragraph}
      </p>
    );
  };

  // Fonction principale qui gère le rendu de tout le contenu de l'email
  const renderContent = () => {
    let isSmallText = false;

    // Style spécial pour les emails Shine
    if (content.includes('{{IMAGE}}') && (sender?.includes('shine.fr') || sender?.includes('shine@suppport-56631465.com'))) {
      const contentParts = content.replace('{{IMAGE}}\n\n', '').split('\n\n');
      return (

        <div className="bg-white rounded-lg shadow-sm max-w-2xl mx-auto p-8">
          {/* Logo Shine */}
          <div className="flex justify-center mb-8">
            {image && (
              <Image 
                src={image}
                alt="Shine Logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
            )}
          </div>

          {/* Contenu principal */}
          <div className="space-y-4 text-gray-700">
            {contentParts.map((part, index) => {
              if (part.includes('Je donne mon avis') || part.includes('Changer ma carte')) {
                const buttonText = part.includes('Je donne mon avis') ? 'Je donne mon avis' : 'Changer ma carte';
                return (
                  <div key={index} className="mt-8 mb-8 flex justify-center">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors">
                      {buttonText}
                    </button>
                  </div>
                );
              }
              if (part.startsWith('👉')) {
                return (
                  <p key={index} className="flex items-center gap-2 font-semibold">
                    <span>👉</span>
                    {part.replace('👉 ', '')}
                  </p>
                );
              }
              if (part.includes('✨')) {
                return (
                  <p key={index} className="pt-4">
                    {part}
                  </p>
                );
              }
              if (part.includes('Votre avis est précieux')) {
                return (
                  <h1 key={index} className="text-xl font-semibold text-center mb-6">
                    {part}
                  </h1>
                );
              }
              return <p key={index}>{part}</p>;
            })}
          </div>
        </div>
      );
    }

    const contentElements = (
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

    if (backgroundColor) {
      return (
        <div style={{ backgroundColor }} className="p-6 rounded-lg h-full">
          {contentElements}
        </div>
      );
    }

    return contentElements;
  };

  // Rendu final avec gestion de l'alignement du contenu
    return (
    <div className={`max-w-3xl ${contentAlignment === 'center' ? 'lg:ml-[calc(50%-540px)]' : ''}`}>
      {renderContent()}
    </div>
  );
};

export default EmailContent; 