import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string; // '#' if unavailable
};

const projects: Project[] = [
  {
    title: 'Digital-Scribe — Hieroglyph Composer',
    description:
      'An interactive hieroglyph composer with real-time text-to-hieroglyph translation.',
    tech: ['TypeScript', 'React', 'Node.js'],
    github: 'https://github.com/Pyramid-Systems-Inc/Digital-Scribe',
    demo: '#'
  },
  {
    title: 'Myriad-Mind — Decentralized AI',
    description:
      'A decentralized, emergent AI system featuring hyper-specialized agents.',
    tech: ['Python'],
    github: 'https://github.com/Pyramid-Systems-Inc/Myriad-Mind',
    demo: '#'
  },
  {
    title: 'Pyramid-Engine — Multi-platform Game Engine',
    description:
      'A modern, multi-platform game engine.',
    tech: ['C++', 'OpenGL', 'CMake'],
    github: 'https://github.com/Pyramid-Systems-Inc/Pyramid-Engine',
    demo: '#'
  },
  {
    title: 'Roshta — Medical SaaS Platform',
    description:
      'Prescription management system for doctors, patients, and pharmacists.',
    tech: ['C#', 'ASP.NET Core', 'SQL Server'],
    github: 'https://github.com/OmarAglan/Roshta',
    demo: '#'
  },
  {
    title: 'Flixtor — Netflix Clone',
    description:
      'A Netflix clone built with Next.js and TypeScript.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/OmarAglan/Flixtor',
    demo: '#'
  },
  {
    title: 'Baa Language — Arabic Programming Language',
    description:
      'An Arabic programming language similar to C.',
    tech: ['C'],
    github: 'https://github.com/OmarAglan/Baa',
    demo: '#'
  }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.12 }
  }
};

const headingVariants: Variants = {
  hidden: { y: -24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const cardVariants: Variants = {
  hidden: { y: 24, opacity: 0, scale: 0.98 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

function Projects(): JSX.Element {
  return (
    <motion.section
      id="projects"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2, margin: '-100px' }}
      variants={sectionVariants}
    >
      <motion.div
        variants={headingVariants}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-jetbrains-mono font-bold text-text">
          Featured Projects
        </h2>
        <p className="mt-3 text-text/70 font-inter">
          Building solutions that make a difference
        </p>
      </motion.div>

      <motion.div
        variants={gridVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {projects.map((p) => {
          const demoDisabled = !p.demo || p.demo === '#';
          return (
            <motion.article
              key={p.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative rounded-xl"
            >
              {/* Hover gradient glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 via-highlight/0 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card body */}
              <div className="relative h-full min-h-[300px] rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_40px_rgba(0,198,255,0.20)] transition-all duration-300">
                <h3 className="text-xl font-jetbrains-mono font-semibold text-text">
                  {p.title}
                </h3>

                <p
                  className="mt-2 text-sm text-text/80 font-inter"
                  style={
                    {
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    } as never
                  }
                >
                  {p.description}
                </p>

                {/* Tech stack badges */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-highlight/10 text-highlight border border-highlight/20"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="mt-auto pt-6 flex items-center gap-3">
                  <motion.a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                    aria-label={`View code for ${p.title}`}
                  >
                    <FaGithub aria-hidden="true" />
                    <span className="text-sm font-medium">View Code</span>
                  </motion.a>

                  <motion.a
                    href={demoDisabled ? undefined : p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={demoDisabled}
                    whileHover={demoDisabled ? undefined : { scale: 1.06 }}
                    whileTap={demoDisabled ? undefined : { scale: 0.98 }}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${demoDisabled
                        ? 'cursor-not-allowed border-white/10 text-text/40 bg-white/5'
                        : 'border-highlight/40 bg-highlight/10 text-highlight hover:bg-highlight/20'
                      }`}
                    aria-label={
                      demoDisabled ? `${p.title} demo unavailable` : `Open ${p.title} live demo`
                    }
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                    <span className="text-sm font-medium">
                      {demoDisabled ? 'Demo Unavailable' : 'Live Demo'}
                    </span>
                  </motion.a>

                  {/* Decorative divider */}
                  <div className="ml-auto h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent/60 transition-all" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default Projects;
