'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LetterCard } from './LetterCard';
import { Heart } from 'lucide-react';

export const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSlidUp, setIsSlidUp] = useState(false);
    const [isCentered, setIsCentered] = useState(false); // New state for centering
    const [isLocked, setIsLocked] = useState(true);
    const dragY = useMotionValue(0);

    // Map drag distance (-80px to 0px) to rotation (0deg to 180deg)
    const rotateX = useTransform(dragY, [-80, 0], [180, 0]);

    const handleDrag = (_: any, info: any) => {
        if (isLocked) return;
        const newY = Math.max(-80, Math.min(0, info.offset.y));
        dragY.set(newY);
    };

    const handleDragEnd = (_: any, info: any) => {
        if (isLocked) return;
        if (!isOpen && info.offset.y < -40) {
            setIsOpen(true);
            dragY.set(0);
            setTimeout(() => {
                setIsSlidUp(true);
                // After sliding up, move to center
                setTimeout(() => {
                    setIsCentered(true);
                }, 800);
            }, 500);
        } else {
            dragY.set(0);
        }
    };

    const handleLockClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLocked(false);
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* Overlay for focus when card is centered */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isCentered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed inset-0 bg-black/60 backdrop-blur-lg z-40 ${isCentered ? 'pointer-events-auto' : 'pointer-events-none'}`}
            />

            {/* The Envelope - Container with 3D Perspective */}
            <div className="relative w-[340px] h-[240px] perspective-[1500px]">

                {/* 1. Back Plate (Deepest layer) */}
                <div className="absolute inset-0 bg-rose-300 rounded-b-xl shadow-inner z-0" />

                {/* 2. The Letter Card (Hidden inside the pocket) */}
                <motion.div
                    className={`absolute inset-0 rounded-b-xl transition-all duration-300 ${isCentered ? 'z-50' : 'z-10'} pointer-events-none`}
                    initial={{ clipPath: 'inset(0px 0px 0px 0px)' }}
                    style={{ clipPath: 'inset(0px 0px 0px 0px)' }}
                    animate={{
                        clipPath: isSlidUp
                            ? 'inset(-100% -50% 0px -50%)' // Expand clip path to allow centering over envelope
                            : 'inset(0px 0px 0px 0px)'
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                >
                    <div className={isSlidUp ? "pointer-events-auto" : "pointer-events-none"}>
                        {!isCentered && (
                            <LetterCard isOpen={isSlidUp} isInside={true} layoutId="letter-card" />
                        )}
                    </div>
                </motion.div>

                {/* 3. The Front "Pocket" Flaps (Left, Right, Bottom) */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Left & Right Flaps - Layered at z-20 */}
                    <div
                        className="absolute inset-0 z-20"
                        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                                background: '#fda4af', /* rose-300 */
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                                background: '#fda4af', /* rose-300 */
                            }}
                        />
                    </div>

                    {/* Bottom Flap - Layered at z-30 (Above others) */}
                    <div className="absolute inset-0 z-30">
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)',
                                background: '#fecdd3', /* rose-200 */
                            }}
                        />
                    </div>
                </div>

                {/* 4. The Top Flap (3D Dual-Sided & Draggable) */}
                <div
                    className={`absolute inset-x-0 top-0 h-1/2 ${isOpen ? 'z-0' : 'z-40'}`}
                    style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
                >
                    <motion.div
                        drag={!isLocked && !isOpen ? "y" : false} // Disable drag if locked
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
                        className={`absolute inset-0 origin-top ${!isLocked ? "cursor-grab active:cursor-grabbing" : ""} preserve-3d`}
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



            {/* Re-parented LetterCard for centering (outside of 3D context) */}
            {
                isCentered && (
                    <LetterCard isOpen={true} isInside={false} isCentered={true} layoutId="letter-card" />
                )
            }

            {/* Heart Lock - Placed here to be on top of everything (Z-Index 50) */}
            {
                !isOpen && (
                    <motion.div
                        className="absolute top-[90px] left-1/2 -translate-x-1/2 text-white cursor-pointer z-50"
                        onClick={handleLockClick}
                        initial={{ y: 0, opacity: 1 }}
                        animate={isLocked ? {} : { y: 300, opacity: 0 }} // Fall down past the envelope
                        transition={{ duration: 0.8, ease: "easeIn" }}
                    >
                        <Heart className="drop-shadow-xl" fill={isLocked ? "currentColor" : "none"} size={64} />
                    </motion.div>
                )
            }

            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isOpen ? 0 : 1 }}
                className={`mt-12 text-rose-500 font-bold tracking-[0.3em] text-xs flex flex-col items-center gap-2 ${isOpen ? 'pointer-events-none' : ''}`}
            >
                <motion.span
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    {isLocked ? "↓" : "↑"}
                </motion.span>
                {isLocked ? "CLICK THE HEART" : "SWIPE UP"}
            </motion.div>
        </div >
    );
};