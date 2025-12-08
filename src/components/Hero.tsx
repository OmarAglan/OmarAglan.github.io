import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type JSX } from "react";
import ParticleBackground from "./ParticleBackground"; // Import new component

function useTypingEffect(text: string, speed = 28, delay = 300): string {
  // ... (keep existing hook logic same as before) ...
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
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function Hero(): JSX.Element {
  const name = "Omar Aglan";
  const title = "Full Stack Software Engineer & Game Developer";
  const taglineFull = "I architect scalable web systems, AI-powered solutions, and immersive digital experiences.";
  const typedTagline = useTypingEffect(taglineFull, 22, 450);

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-background px-6 overflow-hidden"
    >
      {/* 1. New Particle Background */}
      <ParticleBackground />

      {/* 2. Simple Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0D1117_90%)] z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-jetbrains-mono text-4xl sm:text-6xl md:text-7xl font-bold text-text drop-shadow-[0_0_15px_rgba(0,198,255,0.25)]"
        >
          {name}
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          className="mt-6 text-lg sm:text-2xl md:text-3xl text-text/90 font-jetbrains-mono"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-text/70 font-inter mx-auto leading-relaxed"
        >
          <span>{typedTagline}</span>
          <span className="ml-1 inline-block w-2.5 h-5 align-middle bg-accent animate-pulse" />
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            type="button"
            onClick={handleScrollToProjects}
            className="px-8 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 text-text border border-white/10 hover:border-accent/50 transition-all duration-300"
          >
            View My Projects
          </button>

          <a
            href="/assets/resume.pdf"
            download
            className="px-8 py-3 rounded-xl font-medium bg-accent/90 hover:bg-accent text-background transition-all duration-300 shadow-[0_0_20px_rgba(0,198,255,0.3)] hover:shadow-[0_0_30px_rgba(0,198,255,0.5)]"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;