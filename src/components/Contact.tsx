import emailjs from '@emailjs/browser';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type JSX } from 'react';
import { FaCheck, FaCopy, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';

/**
 * Contact Section with EmailJS and Clipboard Copy
 */

interface FormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.12, delayChildren: 0.05 }
  }
};

const leftVariants: Variants = {
  hidden: { x: -24, opacity: 0, scale: 0.98 },
  show: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

const rightVariants: Variants = {
  hidden: { x: 24, opacity: 0, scale: 0.98 },
  show: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

function Contact(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);

  // Form State
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showAlert, setShowAlert] = useState(false);

  // Copy State
  const [emailCopied, setEmailCopied] = useState(false);

  const isLoading = status === 'loading';
  const maxMessageLen = 1000;
  const messageLen = formData.message?.length ?? 0;

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setShowAlert(true);
      const t = window.setTimeout(() => setShowAlert(false), 5000);
      return () => window.clearTimeout(t);
    }
  }, [status]);

  const validate = (data: FormData): FormErrors => {
    const v: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name?.trim()) v.name = 'Name is required.';
    else if (data.name.trim().length < 2) v.name = 'Name must be at least 2 characters.';
    if (!data.email?.trim()) v.email = 'Email is required.';
    else if (!emailPattern.test(data.email)) v.email = 'Please enter a valid email address.';
    if (!data.message?.trim()) v.message = 'Message is required.';
    else if (data.message.trim().length < 10) v.message = 'Message must be at least 10 characters.';
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const v = validate(formData);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setStatus('loading');
    try {
      // TODO: Replace with your actual keys
      await emailjs.sendForm('service_bxugq1a', 'template_tmydnql', formRef.current!, 'ZIalrcivTy9lQg5ZX');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Omar.aglan91@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <motion.section
      id="contact"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '-100px' }}
      variants={sectionVariants}
    >
      <motion.div variants={{ hidden: { y: -20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-jetbrains-mono font-bold text-text">Get In <span className="text-accent">Touch</span></h2>
        <p className="mt-3 text-text/70 font-inter">Let's build something extraordinary together.</p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        {/* Contact Info (Right Side on Desktop) */}
        <motion.aside variants={rightVariants} className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative h-full rounded-2xl border border-white/10 bg-[#161b22] p-6 shadow-lg">
            <h3 className="text-lg sm:text-xl font-jetbrains-mono font-semibold text-text mb-6">Contact Information</h3>
            <ul className="space-y-4">

              {/* Email (Copyable) */}
              <li>
                <button
                  onClick={handleCopyEmail}
                  className="group w-full flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-accent/30 text-left"
                  type="button"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                    {emailCopied ? <FaCheck /> : <FaEnvelope />}
                  </span>
                  <div className="flex-1">
                    <span className="block text-xs text-text/50 uppercase tracking-wider">Email</span>
                    <span className="text-sm sm:text-base text-text break-all">Omar.aglan91@gmail.com</span>
                  </div>
                  <div className="text-text/40 group-hover:text-accent transition-colors">
                    {emailCopied ? <span className="text-xs font-bold text-green-400">Copied!</span> : <FaCopy />}
                  </div>
                </button>
              </li>

              {/* LinkedIn */}
              <li>
                <a
                  href="https://linkedin.com/in/omar-aglan-5078b3235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-accent/30"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                    <FaLinkedin />
                  </span>
                  <div>
                    <span className="block text-xs text-text/50 uppercase tracking-wider">LinkedIn</span>
                    <span className="text-sm sm:text-base text-text">linkedin.com/in/omar-aglan</span>
                  </div>
                </a>
              </li>

              {/* GitHub */}
              <li>
                <a
                  href="https://github.com/OmarAglan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-accent/30"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                    <FaGithub />
                  </span>
                  <div>
                    <span className="block text-xs text-text/50 uppercase tracking-wider">GitHub</span>
                    <span className="text-sm sm:text-base text-text">github.com/OmarAglan</span>
                  </div>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+201024741021"
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-accent/30"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                    <FaPhone />
                  </span>
                  <div>
                    <span className="block text-xs text-text/50 uppercase tracking-wider">Phone</span>
                    <span className="text-sm sm:text-base text-text">+20 102 474 1021</span>
                  </div>
                </a>
              </li>

              {/* Location */}
              <li>
                <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <span className="block text-xs text-text/50 uppercase tracking-wider">Location</span>
                    <span className="text-sm sm:text-base text-text">Kafr El-Sheikh, Egypt</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </motion.aside>

        {/* Contact Form (Left Side on Desktop) */}
        <motion.div variants={leftVariants} className="order-2 lg:order-1 lg:col-span-7">
          <div className="relative rounded-2xl border border-white/10 bg-[#161b22] p-6 shadow-lg">

            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mb-6 rounded-lg border px-4 py-3 ${status === 'success'
                      ? 'border-green-500/30 bg-green-500/10 text-green-400'
                      : 'border-red-500/30 bg-red-500/10 text-red-400'
                    }`}
                >
                  {status === 'success'
                    ? "Message sent successfully! I'll get back to you soon."
                    : "Something went wrong. Please try again later."}
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text/80 mb-1">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-lg bg-white/5 border px-4 py-3 text-text placeholder:text-text/30 outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/50 ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text/80 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-lg bg-white/5 border px-4 py-3 text-text placeholder:text-text/30 outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/50 ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text/80 mb-1">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-text placeholder:text-text/30 outline-none transition-all focus:border-accent/50 focus:ring-1 focus:ring-accent/50"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text/80 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={maxMessageLen}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded-lg bg-white/5 border px-4 py-3 text-text placeholder:text-text/30 outline-none transition-all resize-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 ${errors.message ? 'border-red-500/50' : 'border-white/10'}`}
                  placeholder="Tell me about your project..."
                />
                <div className="mt-1 flex justify-end">
                  <span className="text-xs text-text/40">{messageLen}/{maxMessageLen}</span>
                </div>
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-background font-bold py-3.5 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,198,255,0.3)]"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;