"use client"
import { FiMenu, FiSearch, FiHelpCircle, FiSettings, FiGrid, FiMail, FiInbox } from "react-icons/fi";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
import { BsThreeDotsVertical, BsArchive, BsTrash } from "react-icons/bs";
import { useState } from 'react';
import QuizModal from './QuizModal';
import EmailView from './EmailView';
import emailsData from '../data/emails.json';
import quizzesData from '../data/quizzes.json' assert { type: 'json' };
import { Question } from '../types';
import EmailItem from './EmailItem';
import type { QuizData } from '../types';
import IntroModal from "./IntroModal";
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

const typedQuizData  = quizzesData as QuizData;

export default function GmailInterface() {

  const [showIntro, setShowIntro] = useState(true);

  const [showQuiz, setShowQuiz] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [globalScore, setGlobalScore] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [completedEmails, setCompletedEmails] = useState<string[]>([]);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const handleEmailClick = (email: Email) => {
    if (completedEmails.includes(email.id)) {
      alert("Vous avez déjà répondu à la question de cet email. Passez au suivant !");
      return;
    }
    
    setSelectedEmail(email);
    if (email.questionId) {
      const question = typedQuizData.questions[email.questionId];
      setCurrentQuestion(question);
    }
  };

  const handleStartQuiz = () => {
    if (selectedEmail && selectedEmail.quizId) {
      const quiz = typedQuizData.quizzes[selectedEmail.quizId];
      setActiveQuestions(quiz.questions);
      setShowQuiz(true);
      setSelectedEmail(null);
    }
  };

  const handleAnswerSubmit = (answer: boolean) => {
    if (showResult) return;

    setUserAnswer(answer);
    setShowResult(true);
    setTotalQuestionsAnswered(prev => prev + 1);
    
    if (answer === currentQuestion?.isCorrect) {
      setGlobalScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedEmail) {
      const newCompletedEmails = [...completedEmails, selectedEmail.id];
      setCompletedEmails(newCompletedEmails);
      
      if (newCompletedEmails.length === emailsData.emails.length) {
        setShowFinalScore(true);
      }
    }
    resetQuiz();
    setSelectedEmail(null);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setUserAnswer(null);
    setShowResult(false);
    setCurrentQuestionIndex(0);
  };

  const getTotalQuestions = () => {
    return Object.values(typedQuizData.quizzes).reduce((total, quiz) => {
      return total + quiz.questions.length;
    }, 0);
  };

  return (
    <div className="h-screen bg-[#f6f8fc] relative">
        {showIntro && (
        <IntroModal onClose={() => setShowIntro(false)} />
      )}

      <div className="h-16 px-4 bg-white flex items-center justify-between border-b">
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
      </div>

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
            {emailsData.emails.map((email) => (
              <EmailItem 
                key={email.id}
                {...email}
                isCompleted={completedEmails.includes(email.id)}
                onClick={() => handleEmailClick(email)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer explicatif global */}
      <div className="fixed bottom-0 w-full bg-white border-t py-4 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              Cliquez sur un email pour commencer le quiz. Lisez attentivement chaque email et répondez aux questions pour tester vos connaissances en sécurité.
            </p>
            <div className="bg-blue-100 rounded-lg px-4 py-2">
              <p className="text-blue-800 font-medium">
                Score Global : {globalScore} / {totalQuestionsAnswered} questions
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedEmail && currentQuestion && (
        <EmailView
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          onNextQuestion={handleNextQuestion}
          showResult={showResult}
          userAnswer={userAnswer}
        />
      )}

      {showQuiz && (
        <QuizModal
          question={activeQuestions[currentQuestionIndex]}
          onClose={resetQuiz}
          userAnswer={userAnswer}
          showResult={showResult}
          onAnswerSubmit={handleAnswerSubmit}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={activeQuestions.length}
          score={globalScore}
          totalAnswered={totalQuestionsAnswered}
        />
      )}

      {showFinalScore && (
        <ScoreModal
          score={globalScore}
          totalAnswered={totalQuestionsAnswered}
          onClose={() => setShowFinalScore(false)}
        />
      )}
    </div>
  );
} 