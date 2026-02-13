'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LetterCard } from './LetterCard';
import { Heart } from 'lucide-react';

export const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSlidUp, setIsSlidUp] = useState(false);
    const dragY = useMotionValue(0);

    // Map drag distance (-80px to 0px) to rotation (0deg to 180deg)
    const rotateX = useTransform(dragY, [-80, 0], [180, 0]);

    const handleDrag = (_: any, info: any) => {
        // Update dragY based on drag offset, clamped to prevent over-rotation
        const newY = Math.max(-80, Math.min(0, info.offset.y));
        dragY.set(newY);
    };

    const handleDragEnd = (_: any, info: any) => {
        // If dragged more than 40px up, trigger the full open animation
        if (!isOpen && info.offset.y < -40) {
            setIsOpen(true);
            dragY.set(0); // Reset dragY
            setTimeout(() => {
                setIsSlidUp(true);
            }, 500);
        } else {
            // Spring back to closed position
            dragY.set(0);
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* The Envelope - Container with 3D Perspective */}
            <div className="relative w-[340px] h-[240px] perspective-[1500px]">

                {/* 1. Back Plate (Deepest layer) */}
                <div className="absolute inset-0 bg-rose-300 rounded-b-xl shadow-inner z-0" />

                {/* 2. The Letter Card (Hidden inside the pocket) */}
                <div className="absolute inset-0 overflow-hidden rounded-b-xl z-10 pointer-events-none">
                    <LetterCard isOpen={isSlidUp} isInside={true} />
                </div>

                {/* 3. The Front "Pocket" Flaps (Left, Right, Bottom) */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={{
                            clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                            background: '#fda4af' /* rose-300 */
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                            background: '#fda4af' /* rose-300 */
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)',
                            background: '#fecdd3' /* rose-200 */
                        }}
                    />
                </div>

                {/* 4. The Top Flap (3D Dual-Sided & Draggable) */}
                <div
                    className="absolute inset-x-0 top-0 h-1/2 z-40"
                    style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
                >
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={!isOpen ? handleDrag : undefined}
                        onDragEnd={!isOpen ? handleDragEnd : undefined}
                        animate={{
                            rotateX: isOpen ? 180 : 0
                        }}
                        transition={{
                            rotateX: {
                                duration: 0.8,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute inset-0 origin-top cursor-grab active:cursor-grabbing"
                        style={{
                            rotateX: isOpen ? 180 : rotateX,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Front Face (Outside) - Segitiga ujung BAWAH (0° - 90°) */}
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)', // Ujung lancip di BAWAH
                                background: '#fb7185', /* rose-400 */
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                transform: 'rotateX(0deg) translateZ(1px)'
                            }}
                        >
                            <div className="absolute inset-0 border-t border-rose-500/20" />
                            {!isOpen && (
                                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
                                    <Heart fill="currentColor" size={24} />
                                </div>
                            )}
                        </div>

                        {/* Back Face (Inside) - Segitiga ujung ATAS (90° - 180°) */}
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: 'polygon(50% 0, 0 100%, 100% 100%)', // Ujung lancip di ATAS (MIRROR!)
                                background: '#e11d48', /* rose-600 (Darker) */
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                transform: 'rotateX(180deg) translateZ(1px)'
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Letter reveal overlay when slid up (to make it clickable) */}
            {isSlidUp && (
                <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[300px] z-50">
                    <LetterCard isOpen={true} isInside={false} />
                </div>
            )}

            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-12 text-rose-500 font-bold tracking-[0.3em] text-xs flex flex-col items-center gap-2"
                >
                    <motion.span
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        ↑
                    </motion.span>
                    SWIPE UP
                </motion.div>
            )}
        </div>
    );
};