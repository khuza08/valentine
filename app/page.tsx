'use client';

import React from 'react';
import { Envelope } from '@/components/Envelope';
import { HeartParticles } from '@/components/HeartParticles';

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center p-4 relative overflow-hidden bg-rose-50">
      <HeartParticles />

      <div className="z-10 text-center space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary drop-shadow-sm">
            Happy Valentine's Day
          </h1>
          <p className="text-rose-400 font-medium tracking-widest uppercase text-sm">
            A special message for you
          </p>
        </header>

        <div className="mt-8">
          <Envelope />
        </div>
      </div>

      <footer className="absolute bottom-8 text-rose-300 text-xs font-medium tracking-tighter">
        MADE WITH ❤️ FOR SOMEONE SPECIAL
      </footer>
    </main>
  );
}
