import Image from 'next/image';
import Link from 'next/link';
import { FiShare2 } from 'react-icons/fi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { useState } from 'react';

interface ScoreModalProps {
  score: number;
  totalAnswered: number;
  onClose: () => void;
  onReplay: () => void;
}

export default function ScoreModal({ score, totalAnswered, onClose, onReplay }: ScoreModalProps) {
  const [shareMessage, setShareMessage] = useState('');

  const getScoreContent = () => {
    if (score === 10) {
      return {
        message: "C'est un sans-faute ! Incroyable !\n\nEs-tu expert ou est-ce un coup de chance ? Face aux arnaqueurs autant te donner toutes nos armes ✅",
        subtitle: "",
        listItems: [
          "tu peux toujours rejouer et remettre ta couronne en jeu",
          <>ou bien <span className="font-bold">consulter le guide</span> récapitulant les bons conseils donnés par des institutions officiels (banque et gouvernement).</>
        ]
      };
    } else if (score <= 5) {
      return {
        message: "Oups, il semblerait que les faux mails aient de l'avance sur toi... pour l'instant !",
        subtitle: "Pas de panique :",
        listItems: [
          "tu peux toujours rejouer et retenir les astuces",
          <>ou bien <span className="font-bold">consulter le guide</span> récapitulant les bons conseils donnés par des institutions officiels (banque et gouvernement).</>
        ]
      };
    } else {
      return {
        message: "Pas mal du tout, détective en herbe ! 🕵️\nTu es sur la bonne voie pour repérer les pièges comme un pro.",
        subtitle: "Encore un petit effort pour atteindre la perfection :",
        listItems: [
          "tu peux toujours rejouer et retenir les astuces",
          <>ou bien <span className="font-bold">consulter le guide</span> récapitulant les bons conseils donnés par des institutions officiels (banque et gouvernement).</>
        ]
      };
    }
  };

  const content = getScoreContent();

  const handleShare = async () => {
    const shareData = {
      title: 'Good or Bad Mail - Quiz de sécurité',
      text: `J'ai obtenu ${score}/10 au quiz de sécurité des emails ! Peux-tu faire mieux ?`,
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        setShareMessage('Lien copié !');
        setTimeout(() => setShareMessage(''), 2000);
      }
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-[600px] mx-auto">
        <div className="flex justify-center mb-4 sm:mb-6">
          <Image 
            src="/Logo Good or Bad mail.com.svg" 
            alt="Good or Bad Mail Logo" 
            width={120}
            height={48}
            className="h-auto w-auto sm:w-[150px]"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">
          Félicitations !
        </h2>
        <p className="text-center mb-2">Tu as obtenu le score de</p>
        <p className="text-blue-500 text-5xl sm:text-6xl font-bold text-center mb-4 sm:mb-6">
          {score}/10
        </p>

        <div className="space-y-2 mb-6 sm:mb-8">
          <p className="whitespace-pre-line text-sm sm:text-base">
            {content.message}
          </p>
        </div>

        {content.subtitle && (
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            {content.subtitle}
          </p>
        )}
        
        <ul className="list-disc pl-6 mb-6 sm:mb-8 space-y-2 text-sm sm:text-base">
          {content.listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <button 
              onClick={handleShare}
              className="bg-blue-400 text-white py-2 sm:py-3 px-4 rounded-[50px] font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Partage le mini-jeu
            </button>
            <Link 
              href="/guide"
              className="bg-blue-400 text-white py-2 sm:py-3 px-4 rounded-[50px] font-medium text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <HiOutlineBookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              Guide & conseils officiels
            </Link>
          </div>
          
          <div className="space-y-3 sm:space-y-4 w-full">
            <button
              onClick={onReplay}
              className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-[50px] font-medium text-sm sm:text-base"
            >
              Rejoue
            </button>

            <p className="text-center text-xs sm:text-sm w-full">
              © 2025 - Conceptualisé par <a href="https://www.linkedin.com/in/anna-giraud" target="_blank" rel="noopener noreferrer" className="font-bold">Anna Giraud</a> et développé par <a href="https://anthony-vouin.com" target="_blank" rel="noopener noreferrer" className="font-bold">Anthony Vouin</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 