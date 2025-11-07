import { motion, AnimatePresence, type Variants } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect, type JSX } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

/**
 * Contact Section with EmailJS integration
 *
 * Setup steps:
 * 1) Create a free account at https://www.emailjs.com/
 * 2) Add an Email Service (e.g., Gmail, Outlook, or SMTP)
 * 3) Create an Email Template that uses variables: name, email, subject, message
 * 4) In this file, replace the placeholders below with your actual IDs:
 *    - YOUR_SERVICE_ID
 *    - YOUR_TEMPLATE_ID
 *    - YOUR_PUBLIC_KEY
 *
 * Alternative (no JS): You can use Formspree:
 *   <form action="https://formspree.io/f/{form_id}" method="POST"> ... </form>
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

const headingVariants: Variants = {
  hidden: { y: -24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const leftVariants: Variants = {
  hidden: { x: -24, opacity: 0, scale: 0.98 },
  show: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const rightVariants: Variants = {
  hidden: { x: 24, opacity: 0, scale: 0.98 },
  show: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

function Contact(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [showAlert, setShowAlert] = useState(false);

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
      // Replace placeholders below with your EmailJS credentials:
      // - Service ID
      // - Template ID
      // - Public Key
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',  // TODO: replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID', // TODO: replace with your EmailJS Template ID (expects: name, email, subject, message)
        formRef.current!,
        'YOUR_PUBLIC_KEY'   // TODO: replace with your EmailJS Public Key
      );

      setStatus('success');

      // Reset form (controlled inputs)
      setFormData({ name: '', email: '', subject: '', message: '' });

      // If you configure Formspree instead, comment out the sendForm call above
      // and set the <form> element to use action="https://formspree.io/f/{form_id}" method="POST"
      // keeping the same input "name" attributes.
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      // Keep loading state in sync even if exceptions occur
      // The explicit isLoading boolean derives from `status`
      setTimeout(() => {
        if (status === 'loading') setStatus('idle');
      }, 0);
    }
  };

  const infoItems = [
    {
      key: 'email',
      Icon: FaEnvelope,
      label: 'Email',
      value: 'Omar.aglan91@gmail.com',
      href: 'mailto:Omar.aglan91@gmail.com',
      external: false
    },
    {
      key: 'github',
      Icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/OmarAglan',
      href: 'https://github.com/OmarAglan',
      external: true
    },
    {
      key: 'linkedin',
      Icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/omar-aglan-5078b3235',
      href: 'https://linkedin.com/in/omar-aglan-5078b3235',
      external: true
    },
    {
      key: 'phone',
      Icon: FaPhone,
      label: 'Phone',
      value: '+20 102 474 1021',
      href: 'tel:+201024741021',
      external: false
    },
    {
      key: 'location',
      Icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Kafr El-Sheikh, Egypt',
      href: undefined,
      external: false
    }
  ] as const;

  return (
    <motion.section
      id="contact"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2, margin: '-100px' }}
      variants={sectionVariants}
    >
      {/* Heading */}
      <motion.div variants={headingVariants} className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-jetbrains-mono font-bold text-text">Get In Touch</h2>
        <p className="mt-3 text-text/70 font-inter">Let's build something extraordinary together.</p>
      </motion.div>

      {/* Layout */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        {/* Contact Info - on mobile first, on desktop at right */}
        <motion.aside
          variants={rightVariants}
          className="order-1 lg:order-2 lg:col-span-5 rounded-xl relative"
        >
          {/* Glow overlay */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 via-highlight/0 to-accent/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_40px_rgba(0,198,255,0.20)] transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-jetbrains-mono font-semibold text-text mb-4">
              Contact Information
            </h3>

            <ul className="space-y-3">
              {infoItems.map(({ key, Icon, label, value, href, external }) => {
                const content = (
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-lg border border-highlight/30 bg-highlight/10 text-highlight w-10 h-10 shrink-0">
                      <Icon className="text-lg" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm text-text/70">{label}</span>
                      <span className="text-text font-inter break-all">{value}</span>
                    </div>
                  </div>
                );

                return (
                  <motion.li
                    key={key}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="group"
                  >
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="block rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors px-3 py-3"
                        aria-label={`${label}: ${value}`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">
                        {content}
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            {/* Decorative footer line */}
            <div className="mt-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
          </div>
        </motion.aside>

        {/* Form - on mobile second, on desktop at left */}
        <motion.div
          variants={leftVariants}
          className="order-2 lg:order-1 lg:col-span-7 rounded-xl relative"
        >
          {/* Glow overlay */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 via-highlight/0 to-accent/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_40px_rgba(0,198,255,0.20)] transition-all duration-300">

            {/* Status messages */}
            <AnimatePresence>
              {showAlert && status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300"
                  role="status"
                  aria-live="polite"
                >
                  Your message has been sent successfully. I'll get back to you soon.
                </motion.div>
              )}
              {showAlert && status === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300"
                  role="alert"
                  aria-live="assertive"
                >
                  Something went wrong while sending your message. Please try again later.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-text/90">
                  Name<span className="text-red-400 ml-0.5" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-text placeholder:text-text/40 outline-none transition-all
                    focus:border-accent/60 focus:ring-2 focus:ring-accent/40
                    ${errors.name ? 'border-red-500/50 focus:ring-red-400/30 focus:border-red-400/70' : ''}`}
                  placeholder="Your name"
                  autoComplete="name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-text/90">
                  Email<span className="text-red-400 ml-0.5" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-text placeholder:text-text/40 outline-none transition-all
                    focus:border-accent/60 focus:ring-2 focus:ring-accent/40
                    ${errors.email ? 'border-red-500/50 focus:ring-red-400/30 focus:border-red-400/70' : ''}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Subject (optional) */}
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-text/90">
                  Subject <span className="text-text/50 text-xs">(optional)</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject ?? ''}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-text placeholder:text-text/40 outline-none transition-all focus:border-accent/60 focus:ring-2 focus:ring-accent/40"
                  placeholder="How can I help?"
                  autoComplete="off"
                />
              </div>

              {/* Message */}
              <div className="mb-5">
                <label htmlFor="message" className="block text-sm font-medium text-text/90">
                  Message<span className="text-red-400 ml-0.5" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={maxMessageLen}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : 'message-help'}
                  className={`mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-text placeholder:text-text/40 outline-none transition-all resize-y
                    focus:border-accent/60 focus:ring-2 focus:ring-accent/40
                    ${errors.message ? 'border-red-500/50 focus:ring-red-400/30 focus:border-red-400/70' : ''}`}
                  placeholder="Write your message..."
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                  {errors.message ? (
                    <p id="message-error" className="text-red-400">{errors.message}</p>
                  ) : (
                    <p id="message-help" className={`text-text/50 ${messageLen < 10 ? 'text-yellow-300/80' : ''}`}>
                      Minimum 10 characters
                    </p>
                  )}
                  <span className={`text-text/50 ${messageLen >= maxMessageLen ? 'text-yellow-300/80' : ''}`}>
                    {messageLen}/{maxMessageLen}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-inter text-sm sm:text-base
                  text-background bg-accent/90 hover:bg-accent transition-all duration-300
                  ring-0 hover:ring-2 hover:ring-highlight/60
                  shadow-[0_0_0_0_rgba(56,189,248,0)] hover:shadow-[0_0_24px_rgba(56,189,248,0.35)]
                  disabled:opacity-60 disabled:cursor-not-allowed`}
                aria-busy={isLoading}
                aria-live="polite"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-background" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;
