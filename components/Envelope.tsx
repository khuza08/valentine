'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LetterCard } from './LetterCard';
import { Heart } from 'lucide-react';

export const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    const x = useMotionValue(0);
    const sliderWidth = 280;
    const handleWidth = 60;

    // Transform x position to opening state
    const opacity = useTransform(x, [0, sliderWidth - handleWidth], [1, 0]);
    const progress = useTransform(x, [0, sliderWidth - handleWidth], [0, 1]);

    const handleDragEnd = (_: any, info: any) => {
        if (info.point.x > (window.innerWidth / 2 + 50)) {
            setIsOpen(true);
        } else {
            x.set(0);
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* The Envelope Container */}
            <div className="relative w-[320px] h-[220px] perspective-1000 z-20">

                {/* Back of Envelope */}
                <div className="absolute inset-0 bg-rose-200 rounded-b-lg shadow-inner shadow-rose-300" />

                {/* The Letter (Inside) */}
                <LetterCard isOpen={isOpen} />

                {/* Left and Right Flaps (Static) */}
                <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                        clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                        background: '#fda4af' /* rose-300 */
                    }}
                />
                <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                        clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                        background: '#fda4af' /* rose-300 */
                    }}
                />

                {/* Bottom Flap (Static) */}
                <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                        clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
                        background: '#fecdd3' /* rose-200 */
                    }}
                />

                {/* Top Flap (Animated) */}
                <motion.div
                    animate={{ rotateX: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 z-40 origin-top shadow-md"
                    style={{
                        clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                        background: '#fb7185', /* rose-400 */
                        backfaceVisibility: 'hidden'
                    }}
                />

                {/* Decorative Heart Seal (only visible when closed) */}
                {!isOpen && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-white drop-shadow-lg">
                        <Heart fill="currentColor" size={40} />
                    </div>
                )}
            </div>

            {/* Slider Interaction */}
            {!isOpen && (
                <div className="mt-12 bg-white/20 backdrop-blur-md rounded-full p-1 w-[300px] border border-white/30 relative">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: sliderWidth - handleWidth }}
                        dragElastic={0}
                        style={{ x }}
                        onDragEnd={handleDragEnd}
                        className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg z-10 relative"
                    >
                        <Heart className="text-primary fill-primary" size={24} />
                    </motion.div>

                    <motion.div
                        style={{ opacity }}
                        className="absolute inset-0 flex items-center justify-center text-rose-800 font-bold tracking-widest text-sm pointer-events-none"
                    >
                        SLIDE TO OPEN
                    </motion.div>
                </div>
            )}

            {isOpen && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-rose-700 italic font-medium"
                >
                    Tap the letter to read it...
                </motion.p>
            )}
        </div>
    );
};
