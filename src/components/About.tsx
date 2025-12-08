import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import { FaFileDownload, FaLinkedin } from 'react-icons/fa';
import Terminal from './Terminal';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' }
  }
};

const terminalVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.4, ease: 'easeOut' }
  }
};

function About(): JSX.Element {
  return (
    <motion.section
      id="about"
      className="relative py-24 sm:py-32 bg-background overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 -ml-24 -mt-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: Narrative */}
          <motion.div variants={textVariants}>
            <motion.h2
              variants={headingVariants}
              className="font-jetbrains-mono text-3xl sm:text-4xl font-bold text-text mb-6"
            >
              About <span className="text-accent">Me</span>
            </motion.h2>

            <div className="space-y-6 text-base sm:text-lg text-text/80 font-inter leading-relaxed">
              <p>
                I am a <strong>Full-Stack Software Engineer</strong> and <strong>Founder</strong> with a deep passion for building scalable systems. Unlike many, I didn't just learn to code—I learned to <em>engineer</em>.
              </p>
              <p>
                My journey ranges from low-level <strong>compiler design</strong> and game engines (C/C++) to modern web architectures using <strong>React, Node.js, and .NET</strong>. I believe in understanding the "black box," not just using it.
              </p>
              <p>
                As the founder of <strong className="text-highlight">Pyramid Systems Inc.</strong>, I lead technical strategy and product development, bridging the gap between complex backend logic and intuitive user experiences.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://linkedin.com/in/omar-aglan-5078b3235"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/20 hover:bg-[#0077b5]/20 transition-all font-medium"
              >
                <FaLinkedin />
                LinkedIn
              </a>
              <a
                href="/assets/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 text-text border border-white/10 hover:bg-white/10 hover:border-accent/50 transition-all font-medium"
              >
                <FaFileDownload />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Terminal */}
          <motion.div variants={terminalVariants} className="relative">
            {/* Glow effect behind terminal */}
            <div className="absolute inset-0 bg-accent/20 blur-2xl -z-10 transform scale-95 translate-y-4" />
            <Terminal />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}

export default About;