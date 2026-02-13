'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LetterCardProps {
    isOpen: boolean;
}

export const LetterCard = ({ isOpen }: LetterCardProps) => {
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
            initial={{ y: 0 }}
            animate={{ y: isOpen ? -200 : 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[300px] bg-white rounded-lg shadow-xl p-6 flex flex-col items-center justify-between text-center z-10"
            style={{ originY: 1 }}
        >
            {!answered ? (
                <>
                    <div className="space-y-4">
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
