'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LetterCardProps {
    isOpen: boolean;
    isInside?: boolean;
    isCentered?: boolean;
}

export const LetterCard = ({ isOpen, isInside = false, isCentered = false }: LetterCardProps) => {

    return (
        <motion.div
            initial={{ y: isInside ? 0 : 400 }}
            animate={isCentered ? {
                position: 'fixed',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: '90vw',
                height: '90vh',
                scale: 1,
                rotateX: 0,
                zIndex: 100,
                transition: { duration: 0.8, type: "spring", damping: 25, stiffness: 120 }
            } : {
                position: 'absolute',
                top: isInside ? '1rem' : 'auto',
                left: '50%',
                x: '-50%',
                y: isOpen ? (isInside ? -350 : 0) : (isInside ? 0 : 400),
                scale: isOpen ? 1 : 0.95,
                width: '90%',
                height: 320,
                rotateX: 0,
                zIndex: isInside ? 0 : 50,
                transition: { type: 'spring', damping: 20, stiffness: 100 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 flex flex-col gap-6 text-center overflow-hidden border border-rose-100`}
        >
            <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center gap-6">

                {/* Letter Content */}
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-rose-600">Dear Special Person,</h2>

                <div className="prose prose-rose max-w-2xl text-rose-800 font-serif leading-relaxed text-lg md:text-xl space-y-4">
                    <p>
                        I wanted to take a moment to tell you how much you mean to me.
                        Every day with you feels like a beautiful adventure, and I am so grateful
                        to have you in my life.
                    </p>
                    <p>
                        Your smile brightens up my darkest days, and your laugh is my favorite melody.
                        Thank you for being you, and for being with me.
                    </p>
                    <p>
                        I hope this little digital card brings a smile to your face just like you bring to mine.
                    </p>
                </div>

                <div className="mt-8 text-rose-500 font-serif italic text-xl">
                    With all my love,<br />
                    <span className="font-bold not-italic mt-2 block mx-auto">Your Valentine</span>
                </div>
            </div>
        </motion.div>
    );
};
