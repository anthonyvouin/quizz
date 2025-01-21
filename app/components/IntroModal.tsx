import Image from 'next/image';

interface IntroModalProps {
  onClose: () => void;
}

export default function IntroModal({ onClose }: IntroModalProps) {
  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px]">
        <div className="flex justify-center mb-6">
          <Image 
            src="/Logo Good or Bad mail.com.svg" 
            alt="Good or Bad Mail Logo" 
            width={150} 
            height={60}
            className="h-auto w-auto sm:w-[180px]"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center">
          Bienvenue sur good or bad mail
        </h2>

        <p className="text-xl sm:text-sm text-center mb-8">
          Le mini-jeu qui t'apprend à repérer le vrai du faux dans ta boite mail 🕵️
        </p>

        <div className="bg-blue-800 text-white p-4 rounded-xl mb-4">
          <p className="font-medium ">Ta mission (si tu l'acceptes) :</p>
          <p className="whitespace-normal">Ouvre 10 mails et décide en un clin d'œil s'ils sont fiables ou non.</p>
        </div>

        <p className="text-m  mb-4">
          À la fin, découvre <span className="font-bold">ton score sur 10</span> et vois si tu es prêt à détecter les 
          arnaqueurs comme un pro... ou si tu as encore besoin de quelques astuces (on 
          t'en donne des simples pour t'améliorer facilement).
        </p>

        <p className="text-s sm:text-sm font-bold mb-4">
          Prêt à te lancer ? Allez, que le tri commence ! ✉️
        </p>

        <button
          onClick={onClose}
          className="w-full py-4 bg-blue-500 text-white rounded-[50px] font-medium text-lg"
        >
          C'est parti pour trier !
        </button>
      </div>
    </div>
  );
}