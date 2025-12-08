import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, type JSX } from 'react';

const bootText = [
    "INITIALIZING_KERNEL...",
    "LOADING_MODULES...",
    "MOUNTING_VIRTUAL_DOM...",
    "CONNECTING_TO_NEURAL_NET...",
    "OPTIMIZING_RENDER_CYCLES...",
    "ESTABLISHING_SECURE_UPLINK...",
    "SYSTEM_READY."
];

interface BootLoaderProps {
    onComplete: () => void;
}

function BootLoader({ onComplete }: BootLoaderProps): JSX.Element {
    const [textIndex, setTextIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // 1. Text Sequence Timer
        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev < bootText.length - 1 ? prev + 1 : prev));
        }, 250); // Change text every 250ms

        // 2. Progress Bar Timer
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Randomize progress increments for "realism"
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);

        // 3. Completion Timer (Total time ~2.5s)
        const completeTimeout = setTimeout(() => {
            onComplete();
        }, 2200);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
            clearTimeout(completeTimeout);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D1117] text-accent font-jetbrains-mono cursor-wait"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="w-full max-w-md px-6">
                {/* Terminal Header */}
                <div className="flex justify-between text-xs text-text/50 mb-2 font-inter uppercase tracking-widest">
                    <span>Boot Sequence</span>
                    <span>v2.0.25</span>
                </div>

                {/* Progress Bar Container */}
                <div className="relative h-1 w-full bg-white/10 overflow-hidden rounded-full mb-4">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_rgba(0,198,255,0.8)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Status Text & Percentage */}
                <div className="flex justify-between items-end h-8">
                    <span className="text-sm md:text-base animate-pulse">
                        {'>'} {bootText[textIndex]}
                    </span>
                    <span className="text-xl font-bold">{Math.min(100, progress)}%</span>
                </div>

                {/* Decorative "Hex" Dump (Optional Visual Noise) */}
                <div className="mt-8 grid grid-cols-4 gap-2 opacity-20 text-[10px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i}>{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default BootLoader;