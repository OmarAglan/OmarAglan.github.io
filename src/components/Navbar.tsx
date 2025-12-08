import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState, type JSX } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

/**
 * Custom Hook to detect which section is currently active
 */
const useScrollSpy = (ids: string[]) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px' } // Trigger when element is near center of viewport
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids]);

    return activeId;
};

function Navbar(): JSX.Element {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Get array of IDs (remove '#' from href)
    const sectionIds = navLinks.map((link) => link.href.substring(1));
    const activeSection = useScrollSpy(sectionIds);

    // Auto-hide navbar logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setMobileMenuOpen(false);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
            setMobileMenuOpen(false);
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#0D1117]/85 backdrop-blur-md border-b border-white/5 shadow-lg shadow-accent/5'
                    : 'bg-transparent py-4'
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="font-jetbrains-mono text-xl font-bold text-text hover:text-accent transition-colors group"
                    >
                        Omar<span className="text-accent group-hover:text-highlight transition-colors">.dev</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`text-sm font-medium transition-colors relative group ${isActive ? 'text-accent' : 'text-text/80 hover:text-accent'
                                        }`}
                                >
                                    {link.name}
                                    {/* Active Indicator Dot */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent shadow-[0_0_8px_rgba(0,198,255,0.5)]"
                                        />
                                    )}
                                    {/* Hover underline (only if not active) */}
                                    {!isActive && (
                                        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent/50 transition-all group-hover:w-full" />
                                    )}
                                </a>
                            );
                        })}

                        <div className="h-5 w-px bg-white/10 mx-2" />

                        <div className="flex gap-4">
                            <a href="https://github.com/OmarAglan" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-text/80 hover:text-accent transition-colors transform hover:scale-110 duration-200">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://linkedin.com/in/omar-aglan-5078b3235" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-text/80 hover:text-accent transition-colors transform hover:scale-110 duration-200">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-text hover:text-accent transition-colors p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-white/10 bg-[#0D1117] overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive
                                                ? 'bg-accent/10 text-accent border border-accent/20'
                                                : 'text-text/80 hover:text-accent hover:bg-white/5'
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                );
                            })}
                            <div className="h-px w-full bg-white/10 my-2" />
                            <div className="flex gap-6 px-4 py-2">
                                <a href="https://github.com/OmarAglan" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text/80 hover:text-accent">
                                    <FaGithub size={20} /> GitHub
                                </a>
                                <a href="https://linkedin.com/in/omar-aglan-5078b3235" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text/80 hover:text-accent">
                                    <FaLinkedin size={20} /> LinkedIn
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

export default Navbar;