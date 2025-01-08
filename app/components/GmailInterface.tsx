"use client"
import { FiMenu, FiSearch, FiHelpCircle, FiSettings, FiGrid, FiMail, FiInbox, FiX } from "react-icons/fi";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical, BsArchive, BsTrash } from "react-icons/bs";
import { useState } from 'react';
import QuizModal from './QuizModal';
import EmailView from './EmailView';

interface QuizQuestion {
  question: string;
  explanation: string;
  isCorrect: boolean;
}

interface Email {
  sender: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  questions: QuizQuestion[];
}

export default function GmailInterface() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const quizQuestions: QuizQuestion[] = [
    {
      question: "Est-ce une bonne pratique de cliquer sur un lien dans un email qui vous demande de vérifier vos informations de sécurité ?",
      explanation: "Les emails légitimes de sécurité ne vous demanderont jamais de cliquer sur un lien direct. Il est préférable d'accéder au site web directement en tapant l'URL ou en utilisant vos favoris.",
      isCorrect: false
    },
    {
      question: "Si l'adresse email de l'expéditeur contient le nom de votre entreprise, cela signifie-t-il que l'email est sûr ?",
      explanation: "Les cybercriminels peuvent facilement usurper (spoofer) une adresse email pour qu'elle ressemble à celle d'une entreprise légitime. Il faut toujours vérifier d'autres indicateurs de sécurité.",
      isCorrect: false
    }
  ];

  const secondQuizQuestions: QuizQuestion[] = [
    {
      question: "Est-il sécurisé d'ouvrir une pièce jointe d'un email si elle provient d'un collègue que vous connaissez ?",
      explanation: "Même si l'email semble provenir d'un collègue, son compte pourrait être compromis. Il est important de vérifier si la pièce jointe est attendue et de scanner tout fichier avant de l'ouvrir.",
      isCorrect: false
    },
 
  ];

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);

  const emails: Email[] = [
    {
      sender: "Équipe de sécurité",
      subject: "Mise à jour importante de sécurité",
      preview: "Nous avons détecté une activité suspecte sur votre compte...",
      content: `Cher utilisateur,

Nous avons détecté une activité suspecte sur votre compte. Pour assurer la sécurité de vos données, nous vous demandons de vérifier vos informations de connexion immédiatement.

Veuillez cliquer sur le lien ci-dessous pour confirmer votre identité :
[Lien de vérification]

Si vous ne procédez pas à cette vérification dans les 24 heures, votre compte sera temporairement suspendu.

Cordialement,
L'équipe de sécurité`,
      time: "10:30",
      questions: quizQuestions
    },
    {
      sender: "Équipe RH",
      subject: "Documents importants à signer",
      preview: "Veuillez trouver ci-joint les documents confidentiels à signer rapidement...",
      content: `Bonjour,

Dans le cadre de la mise à jour de nos dossiers RH, nous vous prions de bien vouloir signer les documents confidentiels en pièce jointe.

Ces documents contiennent des informations importantes concernant votre contrat et doivent être traités en priorité.

Merci de les retourner signés dans les plus brefs délais.

Cordialement,
L'équipe RH`,
      time: "11:45",
      questions: secondQuizQuestions
    }
  ];

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleStartQuiz = () => {
    if (selectedEmail) {
      setActiveQuestions(selectedEmail.questions);
      setShowQuiz(true);
      setSelectedEmail(null);
    }
  };

  const handleAnswerSubmit = (answer: boolean) => {
    setUserAnswer(answer);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer(null);
      setShowResult(false);
    } else {
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setUserAnswer(null);
    setShowResult(false);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="h-screen bg-[#f6f8fc] relative">
      <header className="h-16 px-4 bg-white flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <button className="p-3 hover:bg-gray-100 rounded-full">
            <FiMenu className="text-gray-600 text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-700">Service de sécurité</span>
          </div>
        </div>
        
        <div className="flex-grow max-w-2xl mx-4">
          <div className="flex items-center bg-[#eaf1fb] hover:bg-[#e4ebf8] rounded-full px-4 py-2 w-full">
            <FiSearch className="text-gray-600 mr-3" />
            <input 
              type="text" 
              placeholder="Rechercher dans les messages" 
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-3 hover:bg-gray-100 rounded-full">
            <FiHelpCircle className="text-gray-600 text-xl" />
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-full">
            <FiSettings className="text-gray-600 text-xl" />
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-full">
            <FiGrid className="text-gray-600 text-xl" />
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        <div className="w-64 p-4 bg-white">
          <button className="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-md hover:shadow-lg bg-white">
            <FiMail className="text-gray-600 text-xl" />
            <span>Nouveau message</span>
          </button>

          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-4 px-6 py-2 rounded-r-full bg-[#d3e3fd] text-[#001d35]">
              <FiInbox className="text-gray-600 text-xl" />
              <span>Boîte de réception</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-2 rounded-r-full hover:bg-gray-100">
              <AiOutlineStar className="text-gray-600" />
              <span>Messages suivis</span>
            </div>
            <div className="flex items-center gap-4 px-6 py-2 rounded-r-full hover:bg-gray-100">
              <AiOutlineClockCircle className="text-gray-600" />
              <span>En attente</span>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-white">
          <div className="flex items-center px-4 py-2 border-b">
            <div className="flex items-center gap-4">
              <input type="checkbox" className="w-4 h-4" />
              <BsThreeDotsVertical className="text-gray-600" />
              <BsArchive className="text-gray-600" />
              <BsTrash className="text-gray-600" />
            </div>
          </div>

          <div className="divide-y">
            {emails.map((email, index) => (
              <EmailItem 
                key={index}
                {...email}
                onClick={() => handleEmailClick(email)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedEmail && (
        <EmailView
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {showQuiz && (
        <QuizModal
          question={activeQuestions[currentQuestionIndex]}
          onClose={resetQuiz}
          userAnswer={userAnswer}
          showResult={showResult}
          onAnswerSubmit={handleAnswerSubmit}
          onNext={handleNextQuestion}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={activeQuestions.length}
        />
      )}
    </div>
  );
}

function EmailItem({ sender, subject, preview, time, onClick }: {
  sender: string;
  subject: string;
  preview: string;
  time: string;
  onClick: () => void;
}) {
  return (
    <div 
      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
    </div>
  );
} 