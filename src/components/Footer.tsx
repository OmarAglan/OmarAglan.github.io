import { useEffect, useState, type JSX, type MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaArrowUp, FaEnvelope, FaGithub, FaLinkedin, FaLaptopCode } from 'react-icons/fa';

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  icon: IconType;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

const socialLinks: SocialLink[] = [
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/OmarAglan' },
  { label: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/in/omar-aglan-5078b3235' },
  { label: 'Email', icon: FaEnvelope, href: 'mailto:Omar.aglan91@gmail.com' }
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 18 }
  }
};

function Footer(): JSX.Element {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = (): void => {
      lastY = window.scrollY;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          ticking = false;
          setShowScrollTop(lastY > 300);
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, href: string): void => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const year = new Date().getFullYear();

  return (
    <motion.footer
      id="footer"
      role="contentinfo"
      className="relative overflow-hidden border-t border-white/10 bg-[#0B0F14]/90 backdrop-blur-md"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {/* Top gradient separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding / Credit */}
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-highlight/30 bg-highlight/10 text-highlight shadow-[0_0_32px_rgba(0,198,255,0.15)]">
                <FaLaptopCode className="text-xl" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-jetbrains-mono text-lg text-text truncate">Omar Aglan</p>
                <p className="text-sm text-text/70">
                  Built with <span role="img" aria-label="love">❤️</span> by Omar Aglan
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-text/60">
              Crafting digital experiences, one line of code at a time
            </p>
          </div>

          {/* Quick Navigation */}
          <nav aria-label="Quick navigation" className="md:mx-auto">
            <p className="mb-3 text-sm font-medium text-text/80">Quick Links</p>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap md:flex-col gap-2"
            >
              {navLinks.map((l) => (
                <motion.li key={l.href} variants={itemVariants}>
                  <a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text/80 hover:text-accent hover:border-accent/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* Socials */}
          <div className="md:ml-auto">
            <p className="mb-3 text-sm font-medium text-text/80">Follow Me</p>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              {socialLinks.map(({ label, icon: Icon, href }) => {
                const isExternal = href.startsWith('http');
                return (
                  <motion.li key={label} variants={itemVariants}>
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="group inline-flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-text/80 hover:text-accent hover:border-accent/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition"
                      aria-label={label}
                      title={label}
                    >
                      <Icon aria-hidden="true" className="text-lg transition-transform group-hover:scale-110" />
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="mt-4">
              <a
                href="https://omardev.engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text/60 hover:text-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded px-1"
              >
                omardev.engineer
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-text/60">© {year} Omar Aglan. All rights reserved.</p>
        </div>
      </div>

      {/* Scroll-to-top floating button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrollTop"
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-text shadow-lg backdrop-blur-md hover:text-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition group"
            aria-label="Scroll to top"
          >
            <span
              className="pointer-events-none absolute -inset-1 rounded-full bg-accent/0 group-hover:bg-accent/10 transition"
              aria-hidden="true"
            />
            <FaArrowUp className="text-xl drop-shadow-[0_0_8px_rgba(0,198,255,0.5)]" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
}

export default Footer;
