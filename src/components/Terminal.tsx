import { motion } from 'framer-motion';
import { useEffect, useState, type JSX } from 'react';

const lines = [
    { text: '> whoami', cmd: true, delay: 500 },
    { text: 'Omar Aglan', cmd: false, color: 'text-accent', delay: 800 },
    { text: '> cat location.json', cmd: true, delay: 1500 },
    { text: '{', cmd: false, delay: 1800 },
    { text: '  "country": "Egypt",', cmd: false, delay: 2000, indent: true },
    { text: '  "city": "Kafr El-Sheikh",', cmd: false, delay: 2200, indent: true },
    { text: '  "timezone": "GMT+2"', cmd: false, delay: 2400, indent: true },
    { text: '}', cmd: false, delay: 2600 },
    { text: '> grep "education" bio.txt', cmd: true, delay: 3500 },
    { text: 'ALX Africa: Software Engineering Diploma', cmd: false, delay: 3800, color: 'text-highlight' },
    { text: 'B.Sc. Management Information Systems', cmd: false, delay: 4000, color: 'text-highlight' },
    { text: '> ./current_status.sh', cmd: true, delay: 5000 },
    { text: '🚀 OPEN TO WORK', cmd: false, delay: 5300, color: 'text-green-400 font-bold' },
];

function Terminal(): JSX.Element {
    const [visibleLines, setVisibleLines] = useState<number>(0);

    useEffect(() => {
        // Sequence the lines appearing one by one
        let timeouts: number[] = [];

        lines.forEach((line, index) => {
            const id = window.setTimeout(() => {
                setVisibleLines((prev) => Math.max(prev, index + 1));
            }, line.delay);
            timeouts.push(id);
        });

        return () => timeouts.forEach(window.clearTimeout);
    }, []);

    return (
        <div className="w-full max-w-lg mx-auto rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl shadow-black/50 font-jetbrains-mono text-sm sm:text-base">
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-2 text-xs text-text/40 font-inter">omar@dev-machine:~</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-[320px] overflow-y-auto font-medium leading-relaxed">
                {lines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${line.indent ? 'pl-4' : ''} mb-1`}
                    >
                        {line.cmd ? (
                            <span className="text-pink-400 mr-2">$</span>
                        ) : null}
                        <span className={line.color || 'text-text/80'}>{line.text}</span>
                    </motion.div>
                ))}

                {/* Blinking Cursor */}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-accent align-middle ml-1"
                />
            </div>
        </div>
    );
}

export default Terminal;