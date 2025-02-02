import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const services = [
    {
      title: 'Full Stack Development',
      description: 'Custom web applications built with modern technologies like React, Node.js, and TypeScript. Focused on scalability and performance.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      )
    },
    {
      title: 'Game Development',
      description: 'Creating immersive gaming experiences using Unity and C#. Specializing in both 2D and 3D game development with a focus on performance and user engagement.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      )
    },
    {
      title: 'UI/UX Design',
      description: 'Modern and intuitive user interfaces with a focus on user experience. Creating responsive designs that work seamlessly across all devices.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="service-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      )
    }
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      subject: Yup.string()
        .min(4, 'Subject must be at least 4 characters')
        .required('Subject is required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await emailjs.send(
          'service_bxugq1a',
          'template_tmydnql',
          {
            from_name: values.name,
            from_email: values.email,
            subject: values.subject,
            message: values.message,
          },
          'ZIalrcivTy9lQg5ZX'
        );
        
        alert('Message sent successfully!');
        resetForm();
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <motion.section 
      className="contact-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="contact-content">
        <motion.div 
          className="services-info"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Services I Offer</h3>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <h4>
                {service.icon}
                {service.title}
              </h4>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="contact-form-container">
          <div className="contact-header">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="contact-description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Have a question or want to work together? Feel free to reach out!
            </motion.p>
          </div>
          
          <motion.form
            className="contact-form"
            onSubmit={formik.handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={formik.touched.name && formik.errors.name ? 'error' : ''}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={formik.touched.email && formik.errors.email ? 'error' : ''}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="form-group">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
                className={formik.touched.subject && formik.errors.subject ? 'error' : ''}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <div className="error-message">{formik.errors.subject}</div>
              ) : null}
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className={formik.touched.message && formik.errors.message ? 'error' : ''}
                rows={5}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="error-message">{formik.errors.message}</div>
              ) : null}
            </div>

            <motion.button
              type="submit"
              disabled={formik.isSubmitting}
              className="submit-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formik.isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
