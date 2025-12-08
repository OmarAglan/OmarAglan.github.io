import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import { FaExternalLinkAlt, FaFolderOpen, FaGithub } from 'react-icons/fa';
import GithubActivity from './GithubActivity';

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
};

// Generates a placeholder image matching your theme
const getPlaceholder = (text: string) =>
  `https://placehold.co/800x450/161b22/38bdf8?text=${encodeURIComponent(text)}&font=roboto`;

const projects: Project[] = [
  // FEATURED PROJECT (Index 0): Put your best work here
  {
    title: 'Digital-Scribe',
    description: 'An interactive hieroglyph composer with real-time text-to-hieroglyph translation. Features a custom canvas rendering engine, historical dictionary integration, and export-to-image functionality. Built to preserve and modernize ancient scripts.',
    tech: ['TypeScript', 'React', 'Node.js', 'Canvas API', 'Vite'],
    github: 'https://github.com/Pyramid-Systems-Inc/Digital-Scribe',
    demo: '#',
    image: getPlaceholder('Digital Scribe UI')
  },
  {
    title: 'Myriad-Mind',
    description: 'A decentralized, emergent AI system featuring hyper-specialized agents communicating via a custom P2P protocol to solve complex reasoning tasks.',
    tech: ['Python', 'AI Agents', 'P2P Networking', 'AsyncIO'],
    github: 'https://github.com/Pyramid-Systems-Inc/Myriad-Mind',
    demo: '#',
    image: getPlaceholder('Myriad Mind Architecture')
  },
  {
    title: 'Pyramid-Engine',
    description: 'A high-performance 2D/3D game engine built from scratch. Handles physics collision, entity-component systems (ECS), and OpenGL rendering pipelines.',
    tech: ['C++', 'OpenGL', 'CMake', 'GLSL', 'SDL2'],
    github: 'https://github.com/Pyramid-Systems-Inc/Pyramid-Engine',
    demo: '#',
    image: getPlaceholder('Pyramid Engine Demo')
  },
  {
    title: 'Roshta',
    description: 'A comprehensive medical SaaS platform connecting doctors, patients, and pharmacists. Features e-prescriptions, patient history, and inventory management.',
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'Azure'],
    github: 'https://github.com/OmarAglan/Roshta',
    demo: '#',
    image: getPlaceholder('Roshta Dashboard')
  },
  {
    title: 'Flixtor',
    description: 'A pixel-perfect streaming service clone featuring dynamic content loading, video streaming simulation, authentication, and a responsive responsive UI.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'TMDB API'],
    github: 'https://github.com/OmarAglan/Flixtor',
    demo: '#',
    image: getPlaceholder('Flixtor Interface')
  },
  {
    title: 'Baa Language',
    description: 'A custom compiler and programming language designed with Arabic syntax semantics. Includes a lexical analyzer, parser, and transpiler to C.',
    tech: ['C', 'Compiler Design', 'Flex/Bison', 'Low-level'],
    github: 'https://github.com/OmarAglan/Baa',
    demo: '#',
    image: getPlaceholder('Baa Compiler CLI')
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
  hidden: { y: 30, opacity: 0, scale: 0.98 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

function Projects(): JSX.Element {
  return (
    <motion.section
      id="projects"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: '-50px' }}
      variants={sectionVariants}
    >
      {/* Background Decor Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-highlight/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className="max-w-4xl mx-auto text-center mb-16 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-jetbrains-mono font-bold text-text">
          Featured <span className="text-accent">Projects</span>
        </h2>
        <p className="mt-4 text-text/70 font-inter text-lg">
          A collection of systems, tools, and applications I've architected.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto relative z-10">
        {projects.map((p, index) => {
          const demoDisabled = !p.demo || p.demo === '#';
          const isFeatured = index === 0;

          return (
            <motion.article
              key={p.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`group relative flex flex-col rounded-2xl bg-[#161b22] border border-white/10 overflow-hidden shadow-lg hover:shadow-accent/10 hover:border-accent/40 transition-all duration-300
                ${isFeatured ? 'md:col-span-2 lg:col-span-2 md:flex-row' : 'h-full flex-col'}
              `}
            >
              {/* Image Container */}
              <div
                className={`relative overflow-hidden bg-white/5 border-white/5 group 
                  ${isFeatured
                    ? 'w-full md:w-1/2 h-64 md:h-auto border-b md:border-b-0 md:border-r'
                    : 'w-full h-48 border-b'
                  }
                `}
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 z-10" />
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div
                className={`flex flex-col p-6 
                  ${isFeatured ? 'md:w-1/2 justify-center' : 'flex-1'}
                `}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    {isFeatured && (
                      <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold tracking-wider text-accent uppercase border border-accent/20 rounded-full bg-accent/5">
                        Featured
                      </span>
                    )}
                    <h3 className={`font-jetbrains-mono font-bold text-text group-hover:text-accent transition-colors
                      ${isFeatured ? 'text-2xl' : 'text-xl'}
                    `}>
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex gap-3 z-20 mt-1">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text/60 hover:text-white transition-colors p-1"
                      aria-label={`View ${p.title} on GitHub`}
                    >
                      <FaGithub size={isFeatured ? 22 : 20} />
                    </a>
                    {!demoDisabled && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text/60 hover:text-highlight transition-colors p-1"
                        aria-label={`View live demo of ${p.title}`}
                      >
                        <FaExternalLinkAlt size={isFeatured ? 20 : 18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className={`text-text/70 leading-relaxed mb-6 font-inter
                   ${isFeatured ? 'text-base' : 'text-sm flex-1'}
                `}>
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-medium font-jetbrains-mono rounded-md bg-white/5 text-accent border border-white/10 group-hover:border-accent/30 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <GithubActivity />

      {/* "View More" CTA */}
      <motion.div
        variants={cardVariants}
        className="mt-16 text-center relative z-10"
      >
        <a
          href="https://github.com/OmarAglan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 text-text transition-all group"
        >
          <FaFolderOpen className="text-accent" />
          <span>View all repositories</span>
          <FaExternalLinkAlt className="text-xs text-text/50 group-hover:text-text transition-colors" />
        </a>
      </motion.div>
    </motion.section>
  );
}

export default Projects;