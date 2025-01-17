"use client"
import { FiMenu, FiSearch, FiHelpCircle, FiSettings, FiGrid, FiMail, FiInbox, FiArrowLeft, FiArchive, FiTrash2 } from "react-icons/fi";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical, BsArchive, BsTrash } from "react-icons/bs";
import { useState, useEffect } from 'react';
import emailsData from '../data/emails.json';
import EmailItem from './EmailItem';
import IntroModal from "./IntroModal";
import quizzesData from '../data/quizzes.json';
import ScoreModal from './ScoreModal';
interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  questionId: string;
}

export default function GmailInterface() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completedEmails, setCompletedEmails] = useState<string[]>([]);
  const [globalScore, setGlobalScore] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [randomizedEmails, setRandomizedEmails] = useState<Email[]>([]);

  const handleEmailClick = (email: Email) => {
    if (completedEmails.includes(email.id)) {
      alert("Vous avez déjà répondu à la question de cet email. Passez au suivant !");
      return;
    }
    
    const question = quizzesData.questions[email.questionId as keyof typeof quizzesData.questions];
    if (!question) {
      console.error(`Question non trouvée pour l'email: ${email.id}`);
      return;
    }
    
    setSelectedEmail(email);
    setCurrentQuestion(question);
    setUserAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSubmit = (answer: boolean) => {
    setUserAnswer(answer);
    setShowResult(true);
    setTotalQuestionsAnswered(prev => prev + 1);
    
    if (answer === currentQuestion.isCorrect) {
      setGlobalScore(prev => prev + 1);
    }
    
    if (selectedEmail) {
      const newCompletedEmails = [...completedEmails, selectedEmail.id];
      setCompletedEmails(newCompletedEmails);
    }
  };

  const handleCloseEmail = () => {
    if (selectedEmail && completedEmails.includes(selectedEmail.id)) {
      if (completedEmails.length === emailsData.emails.length) {
        setShowFinalScore(true);
      }
    }
    setSelectedEmail(null);
  };

  const handleReplay = () => {
    const newRandomEmails = getRandomEmails(emailsData.emails);
    setRandomizedEmails(newRandomEmails);
    setGlobalScore(0);
    setTotalQuestionsAnswered(0);
    setCompletedEmails([]);
    setShowFinalScore(false);
    setSelectedEmail(null);
    setCurrentQuestion(null);
    setUserAnswer(null);
    setShowResult(false);
  };

  const handleNextEmail = () => {
    if (!selectedEmail) return;
    
    const currentIndex = randomizedEmails.findIndex(email => email.id === selectedEmail.id);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < randomizedEmails.length) {
      const nextEmail = randomizedEmails[nextIndex];
      const question = quizzesData.questions[nextEmail.questionId as keyof typeof quizzesData.questions];
      if (!question) {
        console.error(`Question non trouvée pour l'email: ${nextEmail.id}`);
        return;
      }
      
      setSelectedEmail(nextEmail);
      setCurrentQuestion(question);
      setUserAnswer(null);
      setShowResult(false);
    } else {
      setSelectedEmail(null);
      if (completedEmails.length === randomizedEmails.length) {
        setShowFinalScore(true);
      }
    }
  };

  const getRandomEmails = (allEmails: Email[], count: number = 10) => {
    const validEmails = allEmails.filter(email => 
      quizzesData.questions[email.questionId as keyof typeof quizzesData.questions]
    );
    
    const shuffled = [...validEmails]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
    
    return shuffled;
  };

  useEffect(() => {
    const selectedEmails = getRandomEmails(emailsData.emails);
    setRandomizedEmails(selectedEmails);
  }, []);

  return (
    <div className="h-screen bg-[#f6f8fc]">
      {showIntro && (
        <IntroModal onClose={() => setShowIntro(false)} />
      )}

      <div className="h-16 px-2 md:px-4 bg-white flex items-center justify-between border-b">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            className="p-2 md:p-3 hover:bg-gray-100 rounded-full lg:hidden"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FiMenu className="text-gray-600 text-xl" />
          </button>
          <button 
            className="p-2 md:p-3 hover:bg-gray-100 rounded-full hidden lg:block"
          >
            <FiMenu className="text-gray-600 text-xl" />
          </button>
          <div className="flex items-center">
            <span className="text-lg md:text-xl text-gray-700">Service de sécurité</span>
          </div>
        </div>
        
        <div className="hidden md:flex flex-grow max-w-2xl mx-4">
          <div className="flex items-center bg-[#eaf1fb] hover:bg-[#e4ebf8] rounded-full px-4 py-2 w-full">
            <FiSearch className="text-gray-600 mr-3" />
            <input 
              type="text" 
              placeholder="Rechercher dans les messages" 
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button className="p-2 md:p-3 hover:bg-gray-100 rounded-full md:hidden">
            <FiSearch className="text-gray-600 text-xl" />
          </button>
          <button className="p-2 md:p-3 hover:bg-gray-100 rounded-full hidden md:block">
            <FiHelpCircle className="text-gray-600 text-xl" />
          </button>
          <button className="p-2 md:p-3 hover:bg-gray-100 rounded-full hidden md:block">
            <FiSettings className="text-gray-600 text-xl" />
          </button>
          <button className="p-2 md:p-3 hover:bg-gray-100 rounded-full hidden md:block">
            <FiGrid className="text-gray-600 text-xl" />
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        <div className={`
          fixed inset-0 z-20 lg:relative lg:z-0 bg-white
          ${showSidebar ? 'block' : 'hidden'} lg:block
        `}>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
          
          <div className={`
            absolute left-0 top-0 bottom-0 w-64 p-4 bg-white
            transform transition-transform duration-200 ease-in-out
            ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
            lg:relative lg:transform-none
          `}>
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl shadow-md hover:shadow-lg bg-white">
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
        </div>

        <div className="flex-grow bg-white overflow-hidden">
          {!selectedEmail ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center px-2 md:px-4 py-2 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center gap-2 md:gap-4">
                  <input type="checkbox" className="w-4 h-4" />
                  <BsThreeDotsVertical className="text-gray-600" />
                  <BsArchive className="text-gray-600" />
                  <BsTrash className="text-gray-600" />
                </div>
              </div>

              <div className="divide-y overflow-y-auto h-[calc(100vh-180px)]">
                {randomizedEmails.map((email) => (
                  <EmailItem 
                    key={email.id}
                    {...email}
                    isCompleted={completedEmails.includes(email.id)}
                    onClick={() => handleEmailClick(email)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-white flex flex-col h-[calc(100vh-180px)] overflow-y-auto">
              <div className="p-2 border-b sticky top-0 bg-white z-10 flex items-center gap-2">
                <button 
                  onClick={handleCloseEmail}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiArrowLeft className="text-gray-600 text-xl" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiArchive className="text-gray-600 text-xl" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiTrash2 className="text-gray-600 text-xl" />
                </button>
              </div>

              <div className="flex-grow overflow-auto">
                <div className="p-4 border-b">
                  <h1 className="text-xl font-semibold">{selectedEmail.subject}</h1>
                </div>

                <div className="p-4 border-b flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedEmail.sender[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{selectedEmail.sender}</span>
                        <span className="text-sm text-gray-500">
                          &lt;{selectedEmail.sender.toLowerCase().replace(/\s+/g, '.')}@entreprise.com&gt;
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">à moi</div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{selectedEmail.time}</span>
                </div>

                <div className="p-6">
                  <div className="max-w-3xl">
                    {selectedEmail.content.split('\n').map((paragraph, index) => (
                      <p key={index} className={`${paragraph.trim() === '' ? 'h-4' : 'mb-4'} text-gray-800`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-white border-t py-2 md:py-4">
        <div className="container mx-auto px-2 md:px-4">
          {!selectedEmail ? (
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <p className="text-sm md:text-base text-gray-700 text-center md:text-left">
                Cliquez sur un email pour commencer le quiz. Lisez attentivement chaque email et répondez aux questions pour tester vos connaissances en sécurité.
              </p>
              <div className="bg-blue-100 rounded-lg px-4 py-2 text-center">
                <p className="text-blue-800 font-medium">
                  Score : {globalScore} / {totalQuestionsAnswered}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-800 font-medium text-center">
                {currentQuestion?.question}
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleAnswerSubmit(true)}
                    disabled={showResult}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      showResult
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    Vrai
                  </button>
                  <button 
                    onClick={() => handleAnswerSubmit(false)}
                    disabled={showResult}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      showResult
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    Faux
                  </button>
                </div>
                
                {showResult && (
                  <div className="text-center">
                    <div className={`p-4 rounded-lg ${
                      userAnswer === currentQuestion.isCorrect 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <p className="font-medium mb-2">
                        {userAnswer === currentQuestion.isCorrect 
                          ? '✅ Bonne réponse !' 
                          : '❌ Mauvaise réponse'}
                      </p>
                      <p>{currentQuestion.explanation}</p>
                    </div>
                    <button
                      onClick={handleNextEmail}
                      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {completedEmails.length === randomizedEmails.length - 1 ? 'Terminer' : 'Email suivant'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showFinalScore && (
        <ScoreModal
          score={globalScore}
          totalAnswered={totalQuestionsAnswered}
          onClose={() => setShowFinalScore(false)}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
} 