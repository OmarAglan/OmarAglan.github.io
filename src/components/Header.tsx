import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const letterVariants = {
    initial: { y: -100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -5,
      scale: 1.1,
      color: '#4169E1',
      textShadow: '0 0 8px rgba(65, 105, 225, 0.6)',
      transition: { duration: 0.2 }
    }
  };

  const headerVariants = {
    initial: { 
      y: -100,
      opacity: 0,
      backdropFilter: "blur(0px)",
      background: "rgba(15, 20, 36, 0)"
    },
    animate: {
      y: 0,
      opacity: 1,
      backdropFilter: "blur(10px)",
      background: "rgba(15, 20, 36, 0.8)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.header 
      className="header"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div 
        className="title-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="title-wrapper">
          <h1 className="title">
            {"Omar".split('').map((letter, i) => (
              <motion.span
                key={`omar-${i}`}
                className="letter"
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={i}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span 
              className="letter space"
              variants={letterVariants}
              initial="initial"
              animate="animate"
              custom={4}
            >
              {" "}
            </motion.span>
            {"Aglan".split('').map((letter, i) => (
              <motion.span
                key={`aglan-${i}`}
                className="letter"
                variants={letterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={i + 5}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Full Stack Dev & Game Dev
          </motion.p>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
