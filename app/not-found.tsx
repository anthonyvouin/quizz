"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="absolute top-4 left-4">
        <Image 
          src="/Logo Good or Bad mail.com.svg" 
          alt="Logo" 
          width={80}
          height={32}
          className="h-auto w-auto"
        />
      </div>

      <div className="text-center space-y-6 max-w-xl w-full px-4">
        <DotLottieReact
          src="https://lottie.host/db04d89a-8119-41ca-991d-012dd9ce2465/hX3mDH21jN.lottie"
          loop
          autoplay
          className="w-[300px] h-[300px] mx-auto"
        />
        <h2 className="text-3xl font-bold mb-6">Oups, cette page n'existe pas !</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <p className="text-lg">Mais dit moi, sais-tu repérer un vrai mail d'un faux ? 🤔</p>
        </div>
        <Image 
          src="/Logo Good or Bad mail.com.svg" 
          alt="Logo" 
          width={180}
          height={72}
          className="h-auto w-auto mx-auto mb-4"
        />
        <p className="text-lg mb-2">Teste tes réflexes avec <span className="font-bold">Good or Bad Mail,</span></p>
        <p className="text-lg mb-8">le mini jeu qui t'aide à éviter les arnaques en ligne !</p>
        <Link 
          href="/" 
          className="inline-block bg-[#13409E] text-white px-8 py-4 rounded-full text-lg font-medium w-full max-w-[700px] hover:bg-[#0f3178] transition-colors"
        >
          Je teste mes réflexes
        </Link>
      </div>
    </div>
  );
};

export default NotFound;