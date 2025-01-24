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
          width={60}
          height={24}
          className="h-auto w-auto"
        />
      </div>

      <div className="text-center space-y-4 max-w-lg w-full px-4">
        <DotLottieReact
          src="https://lottie.host/db04d89a-8119-41ca-991d-012dd9ce2465/hX3mDH21jN.lottie"
          loop
          autoplay
          className="w-[250px] h-[250px] mx-auto"
        />
        <h2 className="text-2xl font-bold mb-4">Oups, cette page n'existe pas !</h2>
        <div className="flex items-center justify-center gap-2 mb-3">
          <p className="text-base">Mais dit moi, sais-tu repérer un vrai mail d'un faux ? 🤔</p>
        </div>
        <Image 
          src="/Logo Good or Bad mail.com.svg" 
          alt="Logo" 
          width={150}
          height={60}
          className="h-auto w-auto mx-auto mb-3"
        />
        <p className="text-base mb-2">Teste tes réflexes avec <span className="font-bold">Good or Bad Mail,</span></p>
        <p className="text-base mb-6">le mini jeu qui t'aide à éviter les arnaques en ligne !</p>
        <Link 
          href="/" 
          className="inline-block bg-[#13409E] text-white px-6 py-3 rounded-full text-base font-medium w-full max-w-[500px] hover:bg-[#0f3178] transition-colors"
        >
          Je teste mes réflexes
        </Link>
      </div>
    </div>
  );
};

export default NotFound;