import { motion, type Variants } from 'framer-motion';
import type { JSX } from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

interface Experience {
  company: string;
  position: string;
  location: string;
  duration: string;
  current?: boolean;
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
      'Architected Digital-Scribe (React/TS/Node.js) and Myriad-Mind (Python AI).',
      'Designed CI/CD pipelines using GitHub Actions & Docker for automated deployments.',
      'Managed full SDLC from system design to production monitoring.',
    ]
  },
  {
    company: 'Rafeek Academy',
    position: 'Software Engineer',
    location: 'Egypt',
    duration: '2025 – Present',
    current: true,
    achievements: [
      'Developing full-stack web applications using Next.js and ASP.NET Core.',
      'Integrating SQL Server and MongoDB for hybrid data storage solutions.',
      'Optimized API response times by 25% through caching strategies.'
    ]
  },
  {
    company: 'Freelance Projects',
    position: 'Full-Stack Engineer',
    location: 'Remote',
    duration: '2023 – Present',
    current: true,
    achievements: [
      'Delivered custom e-commerce and SaaS solutions using MERN stack.',
      'Modernized legacy PHP codebases to React and Node.js microservices.',
      'Collaborated with clients to define technical requirements and MVP scope.'
    ]
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

function Experience(): JSX.Element {
  return (
    <section id="experience" className="min-h-screen py-24 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-jetbrains-mono font-bold text-text">
            Professional <span className="text-accent">Journey</span>
          </h2>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <span className={`absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full ring-4 ring-background ${exp.current ? 'bg-accent animate-pulse' : 'bg-white/20'
                }`} />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold font-jetbrains-mono text-text">
                  {exp.position}
                </h3>
                <span className="text-sm font-jetbrains-mono text-accent/80 bg-accent/10 px-2 py-1 rounded border border-accent/20 mt-1 sm:mt-0 w-fit">
                  {exp.company}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-text/60 mb-4 font-inter">
                <div className="flex items-center gap-1.5">
                  <FaCalendar className="text-accent" />
                  {exp.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-accent" />
                  {exp.location}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#161b22] border border-white/5 hover:border-accent/30 transition-colors">
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-text/80 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;