import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import type { IconType } from 'react-icons';
import {
  DiMsqlServer
} from 'react-icons/di';
import {
  FaCode,
  FaDatabase,
  FaGamepad,
  FaLayerGroup,
  FaServer,
  FaTools
} from 'react-icons/fa';
import {
  SiC,
  SiCplusplus,
  SiCmake,
  SiCss3,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpengl,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiUnity
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

// Define the structure for a single skill
type Skill = {
  name: string;
  icon: IconType;
};

// Define the structure for a category
type SkillCategory = {
  title: string;
  icon: IconType;
  description: string;
  skills: Skill[];
};

const categories: SkillCategory[] = [
  {
    title: 'Languages & Core',
    icon: FaCode,
    description: 'The foundation of my engineering capabilities.',
    skills: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'C#', icon: TbBrandCSharp },
      { name: 'C++', icon: SiCplusplus },
      { name: 'Python', icon: SiPython },
      { name: 'C', icon: SiC },
      { name: 'Assembly', icon: SiGnubash },
    ]
  },
  {
    title: 'Frontend Ecosystem',
    icon: FaLayerGroup,
    description: 'Building responsive, accessible, and performant UIs.',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
    ]
  },
  {
    title: 'Backend & API',
    icon: FaServer,
    description: 'Scalable server-side architectures and microservices.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'ASP.NET Core', icon: SiDotnet },
      { name: 'Express', icon: SiExpress },
    ]
  },
  {
    title: 'Data Persistence',
    icon: FaDatabase,
    description: 'Optimized storage solutions for complex data models.',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'SQL Server', icon: DiMsqlServer },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Redis', icon: SiRedis },
    ]
  },
  {
    title: 'DevOps & Tooling',
    icon: FaTools,
    description: 'Automating deployment and ensuring code quality.',
    skills: [
      { name: 'Docker', icon: SiDocker },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Git', icon: SiGit },
      { name: 'CMake', icon: SiCmake },
    ]
  },
  {
    title: 'Game Engineering',
    icon: FaGamepad,
    description: 'Interactive simulations and graphics programming.',
    skills: [
      { name: 'Unity', icon: SiUnity },
      { name: 'OpenGL', icon: SiOpengl },
      { name: 'DirectX', icon: FaGamepad }, // Generic fallback using FontAwesome gamepad
    ]
  }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

function Skills(): JSX.Element {
  return (
    <motion.section
      id="skills"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: '-50px' }}
      variants={sectionVariants}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-jetbrains-mono font-bold text-text">
            Technical <span className="text-accent">Arsenal</span>
          </h2>
          <p className="mt-4 text-text/70 font-inter text-lg">
            A curated stack of technologies I use to build scalable, robust systems.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.article
                key={cat.title}
                variants={cardVariants}
                className="group relative h-full rounded-2xl bg-[#12171e] border border-white/5 p-6 hover:border-accent/30 transition-all duration-300 hover:bg-[#161b22]"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-300">
                    <Icon className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-jetbrains-mono text-lg font-bold text-text">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-text/60 mb-6 font-inter min-h-[2.5em]">
                  {cat.description}
                </p>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-accent/40 hover:bg-white/10 text-sm text-text/80 hover:text-white transition-all cursor-default"
                    >
                      <skill.icon className="text-accent" />
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Skills;