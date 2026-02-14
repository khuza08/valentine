'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LetterCardProps {
    isOpen: boolean;
    isInside?: boolean;
}

export const LetterCard = ({ isOpen, isInside = false }: LetterCardProps) => {
    const [answered, setAnswered] = React.useState(false);
    const [noButtonPos, setNoButtonPos] = React.useState({ x: 0, y: 0 });

    const handleYes = () => {
        setAnswered(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e11d48', '#fb7185', '#ffffff']
        });
    };

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoButtonPos({ x, y });
    };

    return (
        <motion.div
            initial={{ y: isInside ? 0 : 400 }}
            animate={{
                y: isOpen ? (isInside ? -350 : 0) : (isInside ? 0 : 400),
                scale: isOpen ? 1 : 0.95,
                rotateX: 0 // Keep flat to avoid z-fighting with envelope
            }}
            style={{ transformStyle: 'preserve-3d' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={`w-[90%] mx-auto h-[320px] bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-between text-center relative ${isInside ? 'top-4' : 'z-50'}`}
        >
            {!answered ? (
                <>
                    <div className="space-y-4">
                        <div className="flex justify-center mb-2">
                            <div className="w-16 h-16 text-rose-300">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    <path d="M12 11c0 2 0 3-1 4" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-primary">Dear You,</h2>
                        <p className="text-rose-700 font-medium">
                            You make my heart skip a beat every time I see you. Will you be my Valentine?
                        </p>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleYes}
                            className="px-8 py-2 bg-primary text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                        >
                            Yes!
                        </button>
                        <motion.button
                            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                            onMouseEnter={moveNoButton}
                            className="px-8 py-2 border-2 border-rose-200 text-rose-400 rounded-full font-bold"
                        >
                            No
                        </motion.button>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full space-y-4"
                >
                    <span className="text-6xl">💖</span>
                    <h2 className="text-3xl font-serif font-bold text-primary">Yay! I'm so happy!</h2>
                    <p className="text-rose-600 italic">I love you! ❤️</p>
                </motion.div>
            )}
        </motion.div>
    );
};
