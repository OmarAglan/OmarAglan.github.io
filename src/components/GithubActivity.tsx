import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import type { JSX } from 'react';

function GithubActivity(): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex justify-center mt-12 mb-20 px-4"
        >
            <div className="p-6 rounded-2xl bg-[#161b22] border border-white/10 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-accent/5">
                <h3 className="text-center font-jetbrains-mono text-sm text-text/70 mb-6 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    Code Frequency
                </h3>

                <div className="overflow-x-auto pb-2">
                    <GitHubCalendar
                        username="OmarAglan"
                        colorScheme="dark"
                        blockSize={12}
                        blockMargin={4}
                        fontSize={12}
                        theme={{
                            dark: [
                                '#161b22', // Empty
                                '#0e4429', // Level 1
                                '#006d32', // Level 2
                                '#26a641', // Level 3
                                '#39d353'  // Level 4 (Bright Green)
                            ],
                        }}
                        labels={{
                            totalCount: '{{count}} contributions',
                        }}
                    />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-text/40 font-jetbrains-mono">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-sm bg-[#161b22] border border-white/5"></div>
                        <div className="w-2 h-2 rounded-sm bg-[#0e4429]"></div>
                        <div className="w-2 h-2 rounded-sm bg-[#006d32]"></div>
                        <div className="w-2 h-2 rounded-sm bg-[#26a641]"></div>
                        <div className="w-2 h-2 rounded-sm bg-[#39d353]"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>
        </motion.div>
    );
}

export default GithubActivity;