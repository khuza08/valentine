'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Heart = ({ delay, x, size, duration }: { delay: number; x: string; size: number; duration: number }) => (
    <motion.div
        initial={{ y: '100vh', opacity: 0, scale: 0 }}
        animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            x: [`${parseFloat(x)}%`, `${parseFloat(x) + (Math.random() * 20 - 10)}%`]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        className="absolute text-rose-300 pointer-events-none z-0"
        style={{ left: x, fontSize: size }}
    >
        ❤️
    </motion.div>
);

export const HeartParticles = () => {
    const [hearts, setHearts] = useState<any[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 20,
            x: `${Math.random() * 100}%`,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 10 + 10,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <Heart key={heart.id} {...heart} />
            ))}
        </div>
    );
};
