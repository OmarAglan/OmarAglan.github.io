import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

interface Experience {
  company: string;
  position: string;
  location: string;
  duration: string;
  current?: boolean; // for positions that are "Present"
  achievements: string[];
}

const EXPERIENCES: Experience[] = [
  {
    company: 'Pyramid Systems Inc.',
    position: 'Founder & Lead Engineer',
    location: 'Remote',
    duration: '2023 – Present',
    current: true,
    achievements: [
      'Designed and delivered full-stack products including Digital-Scribe (React/TypeScript + Node.js) and Myriad-Mind (Python AI system).',
      'Architected backend services, RESTful APIs, and CI/CD pipelines using Docker & GitHub Actions.',
      'Oversaw full SDLC—architecture, testing, deployment, monitoring, and production support.',
      'Mentored junior developers and coordinated cross-functional product releases.'
    ]
  },
  {
    company: 'Rafeek Academy',
    position: 'Software Engineer',
    location: 'Egypt',
    duration: '2025 – Present',
    current: true,
    achievements: [
      'Developed full-stack web applications with React/Next.js frontends and Node.js / ASP.NET Core backends.',
      'Built authentication, authorization, and data-driven APIs integrated with SQL Server and MongoDB.',
      'Improved backend performance by 25% through query optimization and caching.'
    ]
  },
  {
    company: 'Freelance Projects',
    position: 'Full-Stack Engineer',
    location: 'Remote',
    duration: '2023 – Present',
    current: true,
    achievements: [
      'Delivered custom web solutions using React, Vue, Node.js, and PHP.',
      'Modernized legacy codebases with CI/CD pipelines, improving deployment reliability by 40%.',
      'Collaborated with international clients across multiple time zones.'
    ]
  }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.12 }
  }
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

const dotVariants: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring', stiffness: 200, damping: 16 } }
};

const cardVariants = (side: 'left' | 'right'): Variants => ({
  hidden: { opacity: 0, x: side === 'left' ? -48 : 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 70, damping: 16 }
  }
});

function Experience(): JSX.Element {
  const reduce = useReducedMotion();
  return (
    <section id="experience" className="min-h-screen py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-6 sm:px-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div variants={headingVariants} className="mb-14 text-center">
          <div className="mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/30">
            <FaBriefcase aria-hidden="true" />
          </div>
          <h2 className="font-jetbrains-mono text-3xl md:text-4xl font-bold tracking-tight">
            Professional Experience
          </h2>
          <p className="mt-2 text-sm md:text-base text-text/70">
            My journey in software development
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated vertical line (draws on scroll) */}
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 left-5 md:left-1/2 md:-translate-x-1/2 w-1 rounded bg-gradient-to-b from-accent to-highlight"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <ol className="relative">
            {EXPERIENCES.map((exp, idx) => {
              const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';

              return (
                <li
                  key={`${exp.company}-${idx}`}
                  className="relative py-10 md:grid md:grid-cols-2 md:gap-12"
                >
                  {/* Timeline dot with pulse for current roles */}
                  <motion.span
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    className="absolute left-5 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 top-10 size-4 rounded-full bg-accent ring-4 ring-highlight/30 shadow-[0_0_0_4px_rgba(13,17,23,1)]"
                    aria-hidden="true"
                  >
                    {exp.current && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent"
                        style={{ filter: 'blur(8px)', willChange: 'transform, opacity' }}
                        animate={reduce ? undefined : {
                          opacity: [0.65, 0.25, 0.65],
                          scale: [1, 1.6, 1]
                        }}
                        transition={reduce ? undefined : {
                          duration: 1.6,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    )}
                  </motion.span>

                  {/* Experience card */}
                  <motion.article
                    variants={cardVariants(side)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    layout
                    style={{ willChange: 'transform' }}
                    className={`relative mt-2 md:mt-0 ${side === 'left'
                      ? 'md:col-start-1 md:pr-12 md:text-right'
                      : 'md:col-start-2 md:pl-12'
                      } pl-14 md:pl-0`}
                    aria-label={`${exp.position} at ${exp.company}`}
                  >
                    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]">
                      <header className="mb-3">
                        <h3 className="font-jetbrains-mono text-xl md:text-2xl font-semibold">
                          {exp.company}
                        </h3>
                        <h4 className="mt-1 text-base md:text-lg text-highlight">
                          {exp.position}
                        </h4>

                        <div
                          className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 ${side === 'left' ? 'md:justify-end' : ''
                            }`}
                        >
                          <div className="inline-flex items-center gap-2 text-sm text-text/70">
                            <FaCalendar aria-hidden="true" className="text-accent" />
                            <time aria-label="Duration">{exp.duration}</time>
                            {exp.current && (
                              <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent ring-1 ring-accent/30">
                                Present
                              </span>
                            )}
                          </div>
                          <div className="inline-flex items-center gap-2 text-sm text-text/70">
                            <FaMapMarkerAlt aria-hidden="true" className="text-accent" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </header>

                      <ul className="mt-4 space-y-2">
                        {exp.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="text-sm md:text-base leading-relaxed text-text/80"
                          >
                            <span className="mr-2 text-accent">▹</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}

export default Experience;
