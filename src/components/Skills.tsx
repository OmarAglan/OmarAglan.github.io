import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import type { IconType } from 'react-icons';
import { FaCode, FaDatabase, FaDocker, FaGamepad, FaProjectDiagram, FaReact, FaServer } from 'react-icons/fa';

type SkillCategory = {
  title: string;
  icon: IconType;
  skills: string[];
};

const categories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: FaCode,
    skills: ['JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Python', 'Assembly', 'HTML', 'CSS', 'SQL']
  },
  {
    title: 'Frontend',
    icon: FaReact,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    icon: FaServer,
    skills: ['Node.js', 'Express.js', 'NestJS', 'ASP.NET Core']
  },
  {
    title: 'Databases',
    icon: FaDatabase,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server', 'Redis']
  },
  {
    title: 'DevOps & Tools',
    icon: FaDocker,
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'Git', 'Makefile', 'CMake']
  },
  {
    title: 'Game Development',
    icon: FaGamepad,
    skills: ['Unity', 'OpenGL', 'DirectX']
  },
  {
    title: 'Architecture & Concepts',
    icon: FaProjectDiagram,
    skills: ['REST APIs', 'Microservices', 'Authentication (JWT/OAuth2)', 'Testing (Unit/Integration)', 'Compiler Design', 'Low-level Programming']
  }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.1 }
  }
};

const headingVariants: Variants = {
  hidden: { y: -24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const cardVariants: Variants = {
  hidden: { y: 24, opacity: 0, scale: 0.98 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function Skills(): JSX.Element {
  return (
    <motion.section
      id="skills"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '-100px' }}
      variants={sectionVariants}
    >
      <motion.div
        variants={headingVariants}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-jetbrains-mono font-bold text-text">
          Technical Skills
        </h2>
        <p className="mt-3 text-text/70 font-inter">Technologies I work with</p>
      </motion.div>

      <motion.div
        variants={gridVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.article
              key={cat.title}
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-xl min-h-[260px]"
            >
              {/* Hover gradient glow */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 via-highlight/0 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                aria-hidden="true"
              />

              {/* Card body */}
              <div className="relative h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_40px_rgba(0,198,255,0.20)] transition-all duration-300">
                {/* Title + Icon */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center rounded-lg border border-highlight/30 bg-highlight/10 text-highlight w-10 h-10">
                    <Icon className="text-xl" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg sm:text-xl font-jetbrains-mono font-semibold text-text">
                    {cat.title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                {/* Skills as badge pills */}
                <ul className="mt-1 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <motion.li
                      key={s}
                      whileHover={{ scale: 1.05 }}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-highlight/10 text-highlight border border-highlight/20"
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative footer line */}
                <div className="mt-auto pt-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent/60 transition-all" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default Skills;
