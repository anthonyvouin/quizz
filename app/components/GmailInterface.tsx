"use client"
import { FiMenu, FiSearch,  FiInbox, FiArrowLeft, FiArchive, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { BsThreeDotsVertical, BsArchive, BsTrash } from "react-icons/bs";
import { useState, useEffect, useCallback } from 'react';
import emailsData from '../data/emails.json';
import EmailItem from './EmailItem';
import IntroModal from "./IntroModal";
import quizzesData from '../data/quizzes.json';
import ScoreModal from './ScoreModal';
import Image from 'next/image';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Confetti from 'react-confetti';
import { Email } from '../types';



const MAX_QUESTIONS = 10;
const ANIMATION_TEXT_DELAY = 1500;
const EXPLANATION_DELAY = 2000;

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

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
      if (globalScore === MAX_QUESTIONS) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 8000);
      }
    }
  }, [showFinalScore, globalScore]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const renderEmailContent = (content: string) => {
    let isSmallText = false;

    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.includes('{{small}}')) {
        isSmallText = true;
        paragraph = paragraph.replace('{{small}}', '');
      }

      if (paragraph.includes('{{small}}')) {
        isSmallText = false;
        paragraph = paragraph.replace('{{small}}', '');
      }

      if (paragraph.includes('{{IMAGE}}')) {
        return selectedEmail?.image ? (
          <div key={index} className="my-4">
            {selectedEmail.attachment && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3 max-w-fit cursor-pointer hover:bg-gray-100">
                <Image 
                  src={selectedEmail.attachment.icon}
                  alt="Attachment icon"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <div>
                  <p className="font-medium text-sm text-gray-900">{selectedEmail.attachment.name}</p>
                  <p className="text-xs text-gray-500">Cliquez pour ouvrir</p>
                </div>
              </div>
            )}
            <Image 
              src={selectedEmail.image} 
              alt="Email image"
              width={selectedEmail.imageWidth || 200}
              height={selectedEmail.imageHeight || 100}
              className="rounded-lg"
            />
          </div>
        ) : null;
      }

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

      // Gérer les listes avec puces
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

      return <p key={index} className={`mb-4 ${isSmallText ? 'text-xs text-gray-500' : ''}`}>{paragraph}</p>;
    });
  };

  return (
    <div className="h-screen bg-[#f6f8fc]">
      {showIntro && (
        <IntroModal onClose={() => setShowIntro(false)} />
      )}

      <div className="h-14 sm:h-16 bg-white flex items-center border-b">
        <div className="flex items-center gap-2 min-w-[100px] sm:min-w-[120px] pl-4">
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
        
        <div className="flex-1 flex">
          <div className="hidden lg:block w-40"></div>
          <div className="flex-1">
            <div className="hidden lg:flex items-center bg-[#f1f3f4] hover:bg-gray-100 rounded-lg px-4 py-2 w-full lg:w-[calc(100%-576px)]">
              <FiSearch className="text-gray-600 mr-3 w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Rechercher"
                className="bg-transparent outline-none w-full text-sm sm:text-base placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="w-[100px] sm:w-[120px] invisible lg:w-72">
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
              <div 
                onClick={handleCloseEmail}
                className="flex items-center gap-4 px-6 py-2 rounded-2xl bg-[#d3e3fd] text-[#001d35] cursor-pointer hover:bg-[#c3d7f7]"
              >
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

              <div className="divide-y overflow-y-auto h-[calc(100vh-280px)] sm:h-[calc(100vh-180px)] custom-scrollbar">
                {randomizedEmails.map((email) => (
                  <EmailItem 
                    key={email.id}
                    {...email}
                    isCompleted={completedEmails.includes(email.id)}
                    onClick={() => handleEmailClick(email)}
                    attachment={email.attachment}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-grow bg-white flex flex-col h-[calc(100vh-180px)] overflow-y-auto">
              <div className="flex items-center px-2 md:px-4 py-2 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center gap-2 md:gap-4">
                  <button 
                    onClick={handleCloseEmail}
                    className="hover:bg-gray-100 rounded-full"
                  >
                    <FiArrowLeft className="text-gray-600" />
                  </button>
                  <BsThreeDotsVertical className="text-gray-600" />
                  <BsArchive className="text-gray-600" />
                  <BsTrash className="text-gray-600" />
                </div>
              </div>

              <div className="flex-grow overflow-auto">
                <div className="p-4 border-b">
                  <h1 className="text-xl font-semibold">{selectedEmail.subject}</h1>
                </div>

                <div className="p-4 border-b flex justify-between items-start">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {selectedEmail.sender[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-semibold truncate">{selectedEmail.sender}</span>
                        <span className="text-xs sm:text-sm text-gray-500 truncate">
                          &lt;{selectedEmail.sender.toLowerCase().replace(/\s+/g, '.')}&gt;
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">à moi</div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2 whitespace-nowrap">{selectedEmail.time}</span>
                </div>

                <div className="p-6 pb-20 sm:pb-6">
                  <div className="max-w-3xl">
                    {renderEmailContent(selectedEmail.content)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 w-full">
        <div className="bg-blue-800 flex">
          <div className="hidden lg:block w-72"></div>
          <div className="flex-1 py-4">
            {!selectedEmail ? (
              <div className="flex flex-col items-start">
                <p className="text-white font-medium text-lg mb-2 px-4 sm:px-0">Clique sur un mail pour commencer le quiz ✉️</p>
                <p className="text-white text-sm mt-1 px-4 sm:px-0">Lit attentivement chaque email et devine si le mail est sûr ou frauduleux.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2 sm:gap-4">
                  <p className="text-white font-medium text-sm sm:text-base text-center">
                    {currentQuestion?.question}
                  </p>
                  <div className="flex flex-col items-center gap-2 sm:gap-4">
                    <div className="flex gap-2 sm:gap-4">
                      <button 
                        onClick={() => handleAnswerSubmit(true)}
                        disabled={showResult}
                        className={`w-[160px] sm:w-[200px] px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-2 ${
                          showResult
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-success-050 text-success-900 hover:bg-success-050/90'
                        }`}
                      >
                        <span className="flex items-center gap-2"><span className="text-xl font-bold">✓</span> Le mail<br className="sm:hidden" /> est sûr</span>
                      </button>
                      <button 
                        onClick={() => handleAnswerSubmit(false)}
                        disabled={showResult}
                        className={`w-[160px] sm:w-[200px] px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-2 ${
                          showResult
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-error-100 text-error-900 hover:bg-error-100/90'
                        }`}
                      >
                        <span className="flex items-center gap-2"><span className="text-xl font-bold">✕</span> Le mail<br className="sm:hidden" /> est frauduleux</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:flex bg-white w-1/3 md:w-1/6 items-center  justify-center border-t-4 border-[#031347]">
            <p className="font-bold text-[#031347] text-m">
              Score : {globalScore} / {totalQuestionsAnswered}
            </p>
          </div>
        </div>
        <div className="md:hidden bg-white w-full py-3 border-t">
          <p className="font-bold text-blue-800 text-m text-center">
            Score : {globalScore} / {totalQuestionsAnswered}
          </p>
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-700 ease-in-out">
          <div className={`bg-transparent rounded-lg max-w-2xl w-full mx-4 overflow-hidden transform transition-all duration-1000 ease-in-out ${
            showResult ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'
          }`}>
            <div className={`p-6 transition-all duration-1000 ease-in-out transform ${
              userAnswer === currentQuestion.isCorrect 
                ? 'bg-success-050'
                : 'bg-error-050'
            } text-xs sm:text-sm`}>
              <div className={`transition-all duration-1000 ease-in-out transform ${
                !showResultText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'
              }`}>
                <div className="flex flex-col items-center bg-transparent">
                  <div className="w-32 h-32">
                    <DotLottieReact
                      src={userAnswer === currentQuestion.isCorrect 
                        ? "https://lottie.host/ff04965a-2edb-4f93-80ef-01eb70b5bab9/SABZwP6GPK.lottie"
                        : "https://lottie.host/8bb3a2ef-b825-42c4-9c78-53eefa64b9bd/4AuZ1AwQXt.lottie"}
                      autoplay
                    />
                  </div>
                  <div className={`transform ${showAnimationText ? 'opacity-100' : 'opacity-0'}`}>
                    <p className={`text-xl font-medium mt-4 text-center ${
                      userAnswer === currentQuestion.isCorrect 
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}>
                      {userAnswer === currentQuestion.isCorrect 
                        ? 'Bonne réponse, le mail était sûr !'
                        : 'Mauvaise réponse, le mail était frauduleux !'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`transition-all duration-1000 ease-in-out transform origin-top ${
                showResultText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
              }`}>
                {showResultText && (
                  <>
                    <div className={`space-y-4 ${
                      userAnswer === currentQuestion.isCorrect 
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}>
                      <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <span className="text-2xl">{userAnswer === currentQuestion.isCorrect ? '✓' : '✕'}</span>
                        {userAnswer === currentQuestion.isCorrect 
                          ? 'Bonne réponse, le mail était sûr !'
                          : 'Mauvaise réponse, le mail était frauduleux !'}
                      </h2>
                      <div className="text-lg whitespace-pre-line">
                        {currentQuestion.explanation}
                      </div>
                      <div className="mt-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span>👉</span>
                            <h3 className="text-lg font-medium">Ce qu'il faut faire</h3>
                          </div>
                          <div className="ml-7 text-lg whitespace-pre-line">
                            {currentQuestion.whatToDo}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleNextEmail}
                        className="px-8 py-3 bg-blue-500 text-white font-medium rounded-full w-full transition-all duration-500 ease-in-out "
                      >
                        {selectedEmail && 
                         randomizedEmails.filter(email => !completedEmails.includes(email.id) || email.id === selectedEmail.id).length === 1
                          ? 'Terminer' 
                          : 'Lire le mail suivant'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showFinalScore && (
        <>
          {globalScore === MAX_QUESTIONS && showConfetti && (
            <div className="fixed inset-0 z-[45]">
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={500}
                recycle={true}
                tweenDuration={8000}
                gravity={0.15}
                colors={['#3571E3', '#13409E', '#031347', '#E3EAFF']}
              />
            </div>
          )}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ScoreModal
              score={globalScore}
              totalAnswered={totalQuestionsAnswered}
              onClose={() => setShowFinalScore(false)}
              onReplay={handleReplay}
            />
          </div>
        </>
      )}
    </div>
  );
} 