'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LetterCardProps {
    isOpen: boolean;
    isInside?: boolean;
    isCentered?: boolean;
    layoutId?: string;
}

export const LetterCard = ({ isOpen, isInside = false, isCentered = false, layoutId }: LetterCardProps) => {

    return (
        <motion.div
            layoutId={layoutId}
            layout
            initial={{ y: isInside ? 0 : 400 }}
            animate={{
                y: isCentered ? 0 : (isOpen ? (isInside ? -350 : 0) : (isInside ? 0 : 400)),
                scale: isCentered ? 1 : 0.95,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{
                transformStyle: 'preserve-3d',
                top: !isCentered && isInside ? '1rem' : undefined
            }}
            className={`
                bg-white rounded-xl shadow-2xl p-8 md:p-12 flex flex-col gap-6 text-center overflow-hidden border-2 border-rose-200
                ${isCentered
                    ? 'fixed inset-0 m-auto w-[90vw] h-[90vh] z-[100]'
                    : `absolute left-1/2 -translate-x-1/2 w-[90%] h-[320px] ${isInside ? 'z-0' : 'z-50'}`
                }
            `}
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
