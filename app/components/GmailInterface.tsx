"use client"
import { FiMenu, FiSearch, FiMail, FiInbox, FiArrowLeft, FiArchive, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { BsThreeDotsVertical, BsArchive, BsTrash } from "react-icons/bs";
import { useState, useEffect, useCallback } from 'react';
import emailsData from '../data/emails.json';
import EmailItem from './EmailItem';
import IntroModal from "./IntroModal";
import quizzesData from '../data/quizzes.json';
import ScoreModal from './ScoreModal';
import Image from 'next/image';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  questionId: string;
}

const MAX_QUESTIONS = 10;
const ANIMATION_TEXT_DELAY = 1800;
const EXPLANATION_DELAY = 3500;

export default function GmailInterface() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showResultText, setShowResultText] = useState(false);
  const [completedEmails, setCompletedEmails] = useState<string[]>([]);
  const [globalScore, setGlobalScore] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [randomizedEmails, setRandomizedEmails] = useState<Email[]>([]);
  const [showAnimationText, setShowAnimationText] = useState(false);

  const getRemainingEmails = useCallback(() => {
    return randomizedEmails.filter(email => !completedEmails.includes(email.id));
  }, [randomizedEmails, completedEmails]);

  const isLastEmail = useCallback(() => {
    return getRemainingEmails().length <= 1;
  }, [getRemainingEmails]);

  const resetQuestionStates = useCallback(() => {
    setUserAnswer(null);
    setShowResult(false);
    setShowResultText(false);
  }, []);

  const handleEmailClick = useCallback((email: Email) => {
    if (completedEmails.includes(email.id)) {
      alert("Vous avez déjà répondu à la question de cet email. Choisissez-en un autre !");
      return;
    }

    if (completedEmails.length >= MAX_QUESTIONS) {
      setShowFinalScore(true);
      return;
    }

    const question = quizzesData.questions[email.questionId as keyof typeof quizzesData.questions];
    if (!question) {
      console.error(`Question non trouvée pour l'email: ${email.id}`);
      return;
    }

    setSelectedEmail(email);
    setCurrentQuestion(question);
    resetQuestionStates();
  }, [completedEmails, resetQuestionStates]);

  const handleAnswerSubmit = useCallback((answer: boolean) => {
    if (!currentQuestion || !selectedEmail) return;

    setUserAnswer(answer);
    setShowResult(true);
    setTotalQuestionsAnswered(prev => prev + 1);

    if (answer === currentQuestion.isCorrect) {
      setGlobalScore(prev => prev + 1);
    }

    setCompletedEmails(prev => [...prev, selectedEmail.id]);
  }, [currentQuestion, selectedEmail]);

  const handleCloseEmail = useCallback(() => {
    if (isLastEmail() && selectedEmail && completedEmails.includes(selectedEmail.id)) {
      setShowFinalScore(true);
    }
    setSelectedEmail(null);
    setCurrentQuestion(null);
    resetQuestionStates();
  }, [isLastEmail, selectedEmail, completedEmails, resetQuestionStates]);


  const handleNextEmail = useCallback(() => {
    const remainingEmails = getRemainingEmails();

    if (remainingEmails.length === 0) {
      setShowFinalScore(true);
      setSelectedEmail(null);
      return;
    }

    if (!selectedEmail) {
      const nextEmail = remainingEmails[0];
      const question = quizzesData.questions[nextEmail.questionId as keyof typeof quizzesData.questions];
      if (question) {
        setSelectedEmail(nextEmail);
        setCurrentQuestion(question);
        resetQuestionStates();
      }
      return;
    }

    const currentIndex = randomizedEmails.findIndex(email => email.id === selectedEmail.id);
    let nextEmail = null;

    for (let i = currentIndex + 1; i < randomizedEmails.length; i++) {
      if (!completedEmails.includes(randomizedEmails[i].id)) {
        nextEmail = randomizedEmails[i];
        break;
      }
    }

    if (!nextEmail) {
      for (let i = 0; i < currentIndex; i++) {
        if (!completedEmails.includes(randomizedEmails[i].id)) {
          nextEmail = randomizedEmails[i];
          break;
        }
      }
    }

    if (nextEmail) {
      const question = quizzesData.questions[nextEmail.questionId as keyof typeof quizzesData.questions];
      if (question) {
        setSelectedEmail(nextEmail);
        setCurrentQuestion(question);
        resetQuestionStates();
      }
    } else {
      setShowFinalScore(true);
      setSelectedEmail(null);
    }
  }, [selectedEmail, randomizedEmails, completedEmails, getRemainingEmails, resetQuestionStates]);

  const handleReplay = useCallback(() => {
    const newRandomEmails = getRandomEmails(emailsData.emails);
    setRandomizedEmails(newRandomEmails);
    setGlobalScore(0);
    setTotalQuestionsAnswered(0);
    setCompletedEmails([]);
    setShowFinalScore(false);
    setSelectedEmail(null);
    setCurrentQuestion(null);
    resetQuestionStates();
  }, [resetQuestionStates]);

  const getRandomEmails = useCallback((allEmails: Email[], count: number = MAX_QUESTIONS) => {
    const validEmails = allEmails.filter(email => 
      quizzesData.questions[email.questionId as keyof typeof quizzesData.questions]
    );
    
    return [...validEmails]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }, []);

  useEffect(() => {
    const selectedEmails = getRandomEmails(emailsData.emails);
    setRandomizedEmails(selectedEmails);
  }, [getRandomEmails]);

  useEffect(() => {
    if (showResult) {
      setShowResultText(false);
      setShowAnimationText(false);
      
      const animationTimer = setTimeout(() => {
        setShowAnimationText(true);
      }, ANIMATION_TEXT_DELAY);
      
      const textTimer = setTimeout(() => {
        setShowResultText(true);
      }, EXPLANATION_DELAY);
      
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(textTimer);
      };
    }
  }, [showResult]);

  useEffect(() => {
    if (showFinalScore) {
      setShowResult(false);
    }
  }, [showFinalScore]);

  return (
    <div className="h-screen bg-[#f6f8fc]">
      {showIntro && (
        <IntroModal onClose={() => setShowIntro(false)} />
      )}

      <div className="h-14 sm:h-16 px-2 md:px-4 bg-white flex items-center justify-between border-b">
        <div className="flex items-center gap-2 min-w-[100px] sm:min-w-[120px]">
          <button 
            onClick={() => setShowSidebar(!showSidebar)} 
            className="p-1.5 hover:bg-gray-100 rounded-full block lg:hidden"
          >
            <FiMenu className="w-5 h-5 text-gray-600" />
          </button>
          <Image 
            src="/Logo Good or Bad mail.com.svg"
            alt="Good or Bad Mail Logo"
            width={32}
            height={26}
            className="h-auto w-[60px] sm:w-[80px]"
          />
        </div>
        
        <div className="flex-grow max-w-xs sm:max-w-md md:max-w-2xl mx-3 sm:mx-4">
          <div className="flex items-center bg-[#f1f3f4] hover:bg-gray-100 rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 w-full">
            <FiSearch className="text-gray-600 mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Rechercher"
              className="bg-transparent outline-none w-full text-sm sm:text-base placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="w-[100px] sm:w-[120px] invisible">
          <div className="w-full"></div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        <div className={`
          fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden
          ${showSidebar ? 'block' : 'hidden'}
        `} onClick={() => setShowSidebar(false)} />

        <div className={`
          fixed left-0 top-0 bottom-0 w-64 bg-white z-30 transform transition-transform duration-200 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:transform-none lg:z-0
        `}>
          <div className="p-4">
            <button 
              onClick={handleReplay}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl shadow-md hover:shadow-lg bg-white"
            >
              <FiRefreshCw className="text-gray-600 text-m" />
              <span>Redémarrer la partie</span>
            </button>

            <div className="mt-4 space-y-1">
              <div className="flex items-center gap-4 px-6 py-2 rounded-r-full bg-[#d3e3fd] text-[#001d35]">
                <FiInbox className="text-gray-600 text-m" />
                <span>Boîte de réception</span>
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

      <div className="fixed bottom-0 w-full bg-blue-800 flex">
        <div className="flex-1 py-4 px-4 md:px-8">
          {!selectedEmail ? (
            <div className="flex flex-col items-start max-w-4xl mx-auto">
              <p className="text-white font-medium text-lg">Clique sur un mail pour commencer le quiz ✉️</p>
              <p className="text-white text-sm">Lit attentivement chaque email et devine si le mail est sûr ou frauduleux.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-white font-medium text-center">
                {currentQuestion?.question}
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleAnswerSubmit(true)}
                    disabled={showResult}
                    className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 ${
                      showResult
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-success-050 text-success-900 hover:bg-success-050/90'
                    }`}
                  >
                    ✓ Le mail est sûr
                  </button>
                  <button 
                    onClick={() => handleAnswerSubmit(false)}
                    disabled={showResult}
                    className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 ${
                      showResult
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-error-100 text-error-900 hover:bg-error-100/90'
                    }`}
                  >
                    ✕ Le mail est frauduleux
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white w-[200px] flex items-center justify-center">
          <p className="text-blue-800 font-medium">
            Score : {globalScore} / {totalQuestionsAnswered}
          </p>
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 bg-black transition-opacity duration-300 bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden transform transition-all duration-300 ${
            showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className={`p-6 transition-colors duration-300 ${
              userAnswer === currentQuestion.isCorrect 
                ? 'bg-success-050'
                : 'bg-error-050'
            }`}>
              {!showResultText && (
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 transition-transform duration-300">
                    <DotLottieReact
                      src={userAnswer === currentQuestion.isCorrect 
                        ? "https://lottie.host/b8e404b8-53eb-4268-a373-6ea22dd34e25/Ln7tc65xTZ.lottie"
                        : "https://lottie.host/8bb3a2ef-b825-42c4-9c78-53eefa64b9bd/4AuZ1AwQXt.lottie"}
                      autoplay
                    />
                  </div>
                  <div className={`transition-all duration-300 transform ${
                    showAnimationText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {showAnimationText && (
                      <p className={`text-xl font-medium mt-4 ${
                        userAnswer === currentQuestion.isCorrect 
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}>
                        {userAnswer === currentQuestion.isCorrect 
                          ? 'Bonne réponse, le mail était sûr !'
                          : 'Mauvaise réponse, le mail était frauduleux !'}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className={`transition-all duration-500 ${
                showResultText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
              }`}>
                {showResultText && (
                  <div className={`space-y-4 ${
                    userAnswer === currentQuestion.isCorrect 
                      ? 'text-green-800'
                      : 'text-red-800'
                  }`}>
                    <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                      <span className="text-2xl">{userAnswer === currentQuestion.isCorrect ? '✓' : '✕'}</span>
                      {userAnswer === currentQuestion.isCorrect 
                        ? 'Bonne réponse, le mail était sûr !'
                        : 'Mauvaise réponse, le mail était frauduleux !'}
                    </h2>
                    <ul className="list-disc pl-5">
                      <li>Le mail d'expéditeur ne correspond pas à {selectedEmail?.sender.split(' ')[0]}</li>
                    </ul>
                    {selectedEmail && (
                      <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md text-black">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedEmail.sender[0]}
                        </div>
                        <div>
                          <span className="font-semibold">{selectedEmail.sender}</span>
                          <span className="text-sm"> &lt;{selectedEmail.sender.toLowerCase().replace(/\s+/g, '.')}@entreprise.com&gt;</span>
                          <div className="text-sm">à moi</div>
                        </div>
                      </div>
                    )}
                    <ul className="list-disc pl-5">
                      <li>Le mail joue sur le sentiment d'urgence. Fait attention, plus on te presse de faire une action, moins tu prends le temps de vérifier.</li>
                    </ul>
                    <p>{currentQuestion.explanation}</p>
                    <div className="mt-6 p-4 rounded-lg">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span>👉</span>
                          <h3 className="text-lg font-medium">Ce qu'il faut faire</h3>
                        </div>
                        <p className="ml-7">{currentQuestion.whatToDo}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={`transition-all duration-300 ${
              showResultText ? 'opacity-100' : 'opacity-0'
            }`}>
              {showResultText && (
                <div className={`p-4 flex justify-center ${
                  userAnswer === currentQuestion.isCorrect 
                    ? 'bg-success-050'
                    : 'bg-error-050'
                }`}>
                  <button
                    onClick={handleNextEmail}
                    className="px-8 py-3 bg-blue-500 text-white font-medium rounded-full transition-colors duration-200 "
                  >
                    {selectedEmail && 
                     randomizedEmails.filter(email => !completedEmails.includes(email.id) || email.id === selectedEmail.id).length === 1
                      ? 'Terminer' 
                      : 'Lire le mail suivant'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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