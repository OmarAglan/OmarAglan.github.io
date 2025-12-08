import { motion } from 'framer-motion';
import type { JSX } from 'react';

function NotFound(): JSX.Element {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D1117] relative overflow-hidden">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-[#0D1117] to-[#0D1117]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center px-4"
            >
                <h1 className="font-jetbrains-mono text-9xl font-bold text-white/5 select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="font-jetbrains-mono text-3xl md:text-4xl font-bold text-red-500 bg-[#0D1117] px-4">
                        SYSTEM_ERROR
                    </h2>
                </div>

                <p className="mt-8 text-text/70 font-inter text-lg max-w-md mx-auto">
                    The requested resource could not be found in the current sector. The link may be broken or the signal lost.
                </p>

                <a
                    href="/"
                    className="inline-flex mt-8 items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-text border border-white/10 hover:border-red-500/50 transition-all group"
                >
                    <span className="text-red-500 group-hover:translate-x-[-2px] transition-transform">&lt;</span>
                    Return to Base
                </a>
            </motion.div>
        </div>
    );
}

export default NotFound;