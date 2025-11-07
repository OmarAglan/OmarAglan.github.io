import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import type { IconType } from 'react-icons';
import { FaGamepad } from 'react-icons/fa';
import {
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiUnity
} from 'react-icons/si';
import { TbBrandAws, TbBrandAzure, TbBrandCSharp } from 'react-icons/tb';

type Category = 'Frontend' | 'Backend' | 'Databases' | 'DevOps & Tools' | 'Game Development';

type Tech = {
  name: string;
  icon: IconType;
  category: Category;
};

const technologies: Tech[] = [
  // Frontend
  { name: 'React', icon: SiReact, category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend' },
  { name: 'HTML5', icon: SiHtml5, category: 'Frontend' },
  { name: 'CSS3', icon: SiCss3, category: 'Frontend' },

  // Backend
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend' },
  { name: 'NestJS', icon: SiNestjs, category: 'Backend' },
  { name: '.NET', icon: SiDotnet, category: 'Backend' },
  { name: 'Python', icon: SiPython, category: 'Backend' },
  { name: 'Express', icon: SiExpress, category: 'Backend' },

  // Databases
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Databases' },
  { name: 'MongoDB', icon: SiMongodb, category: 'Databases' },
  { name: 'MySQL', icon: SiMysql, category: 'Databases' },
  { name: 'Redis', icon: SiRedis, category: 'Databases' },

  // DevOps & Tools
  { name: 'Docker', icon: SiDocker, category: 'DevOps & Tools' },
  { name: 'Git', icon: SiGit, category: 'DevOps & Tools' },
  { name: 'GitHub', icon: SiGithub, category: 'DevOps & Tools' },
  { name: 'AWS', icon: TbBrandAws, category: 'DevOps & Tools' },
  { name: 'Azure', icon: TbBrandAzure, category: 'DevOps & Tools' },

  // Game Development
  { name: 'Unity', icon: SiUnity, category: 'Game Development' },
  { name: 'C++', icon: SiCplusplus, category: 'Game Development' },
  { name: 'C#', icon: TbBrandCSharp, category: 'Game Development' },
  { name: 'OpenGL/DirectX', icon: FaGamepad, category: 'Game Development' }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const headingVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 }
  }
};

const paragraphVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.45, ease: 'easeOut' }
  }
});

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 180, damping: 14, mass: 0.7 }
  }
};

function About(): JSX.Element {
  return (
    <motion.section
      id="about"
      className="relative py-20 sm:py-24 md:py-28 bg-white/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {/* Subtle gradient backdrop to differentiate the section */}
      <div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,0.10),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-jetbrains-mono text-3xl sm:text-4xl md:text-5xl text-text"
          variants={headingVariants}
        >
          About Me
        </motion.h2>

        <div className="mt-6 max-w-3xl space-y-4 text-base sm:text-lg md:text-xl text-text/80">
          <motion.p variants={paragraphVariants(0.05)}>
            Full-Stack Software Engineer with strong experience in backend-focused web development using Node.js (Express/NestJS), React.js, and ASP.NET Core. I design scalable APIs, manage databases, implement CI/CD pipelines, and deliver complete product lifecycles from architecture to deployment.
          </motion.p>
          <motion.p variants={paragraphVariants(0.15)}>
            As Founder & Lead Software Engineer at <strong className="text-highlight">Pyramid Systems Inc.</strong>, I lead multi-platform products end-to-end—defining technical strategy, mentoring developers, and ensuring quality delivery. Recent work includes <em>Digital-Scribe</em> and <em>Myriad-Mind</em>.
          </motion.p>
          <motion.p variants={paragraphVariants(0.25)}>
            I’m dedicated to advancing Arabic language integration in technology and enjoy building across web, desktop, mobile, and games. My interests span compiler design, low-level programming, and modern UI/UX that blends performance with polish.
          </motion.p>
          <motion.p variants={paragraphVariants(0.35)}>
            Education: ALX Africa — Professional Diploma in Software Engineering (2024–2025). Higher Institute of MIS, Kafr El-Sheikh — B.Sc. Management Information Systems (2018–2022).
          </motion.p>
        </div>

        <motion.ul
          className="mt-12 md:mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5 sm:gap-6 md:gap-8"
          variants={gridVariants}
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.li key={tech.name} variants={itemVariants}>
                <div className="group relative flex flex-col items-center">
                  <div
                    className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6 text-text transition-all duration-200 ease-out outline-none ring-0 hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_0_3px_rgba(56,189,248,0.18),0_0_35px_rgba(0,198,255,0.25)] focus-visible:scale-110 focus-visible:bg-white/10 focus-visible:shadow-[0_0_0_3px_rgba(56,189,248,0.25),0_0_35px_rgba(0,198,255,0.35)]"
                    aria-label={tech.name}
                    tabIndex={0}
                  >
                    <Icon className="block text-4xl sm:text-5xl md:text-6xl text-text" aria-hidden="true" />
                  </div>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute top-full z-10 mt-3 whitespace-nowrap rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs sm:text-sm text-white/90 opacity-0 backdrop-blur-md shadow-lg transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    {tech.name}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}

export default About;
