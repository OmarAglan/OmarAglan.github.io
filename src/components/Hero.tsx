import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type JSX } from "react";

/**
 * Simple typing effect hook for the tagline
 */
function useTypingEffect(text: string, speed = 28, delay = 300): string {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");
    let i = 0;
    let intervalId: number | null = null;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length && intervalId !== null) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(startId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return display;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function Background(): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft moving glow orbs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[40vmax] w-[40vmax] rounded-full bg-accent/30 blur-3xl opacity-30 mix-blend-screen"
        animate={
          reduce
            ? undefined
            : { x: [-30, 30, -15], y: [0, -25, 10] }
        }
        transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ willChange: "transform, opacity, filter" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-[36vmax] w-[36vmax] rounded-full bg-highlight/25 blur-3xl opacity-30 mix-blend-screen"
        animate={
          reduce
            ? undefined
            : { x: [20, -20, 10], y: [0, 20, -15] }
        }
        transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ willChange: "transform, opacity, filter" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/4 h-[28vmax] w-[28vmax] rounded-full bg-accent/20 blur-2xl opacity-25 mix-blend-screen"
        animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      />

      {/* Subtle wave at the bottom */}
      <motion.svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 right-0 w-[200%] opacity-30"
        animate={reduce ? undefined : { x: ["-10%", "0%", "-10%"] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#00C6FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGrad)"
          d="M0,224L48,224C96,224,192,224,288,192C384,160,480,96,576,80C672,64,768,96,864,128C960,160,1056,192,1152,176C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </motion.svg>
    </div>
  );
}

function Hero(): JSX.Element {
  const reduce = useReducedMotion();

  const name = "Omar Aglan";
  const title = "Full Stack Software Engineer & Game Developer";
  const taglineFull =
    "I architect scalable web systems, AI-powered solutions, and immersive digital experiences.";

  const typedTagline = useTypingEffect(taglineFull, 22, 450);

  const handleScrollToProjects = (): void => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-background px-6 py-24 sm:py-28"
    >
      <Background />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-jetbrains-mono text-4xl sm:text-5xl md:text-7xl text-text drop-shadow-[0_0_18px_rgba(0,198,255,0.35)]"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {name}
        </motion.h1>

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="mt-4 text-lg sm:text-2xl md:text-3xl text-text/90 font-jetbrains-mono"
        >
          {title}
        </motion.h2>

        {/* Tagline with typing + caret */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-text/80 font-inter mx-auto"
        >
          <span>{typedTagline}</span>
          <span
            className={`ml-1 inline-block h-5 align-[-2px] border-r-2 border-accent ${reduce ? "" : "animate-caret-blink"
              }`}
            aria-hidden="true"
          />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            type="button"
            onClick={handleScrollToProjects}
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-inter text-sm sm:text-base text-text/95
                       bg-white/5 hover:bg-white/10 backdrop-blur-md
                       ring-1 ring-white/10 hover:ring-accent/50
                       shadow-[0_0_0_0_rgba(0,198,255,0)] hover:shadow-[0_0_24px_rgba(0,198,255,0.35)]
                       transition-all duration-300"
            aria-label="View My Projects"
          >
            View My Projects
          </button>

          <a
            href="/assets/resume.pdf"
            download
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-inter text-sm sm:text-base text-background
                       bg-accent/90 hover:bg-accent transition-all duration-300
                       ring-0 hover:ring-2 hover:ring-highlight/60
                       shadow-[0_0_0_0_rgba(56,189,248,0)] hover:shadow-[0_0_24px_rgba(56,189,248,0.35)]
                       backdrop-blur-md"
            aria-label="Download Resume"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
