import { motion } from 'framer-motion';
import './AboutMe.css';

const AboutMe = () => {
  const handleDownloadCV = () => {
    window.open('/assets/cv/Omar_Aglan_CV.pdf', '_blank');
  };

  return (
    <motion.section 
      className="about-me"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="about-content">
        <motion.div 
          className="profile-image-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="blob-container">
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              id="blobSvg"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(238, 205, 163, 0.2)' }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(239, 98, 159, 0.2)' }} />
                </linearGradient>
                <clipPath id="shape">
                  <path
                    fill="url(#gradient)"
                    d="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z"
                  />
                </clipPath>
              </defs>
              <g clipPath="url(#shape)">
                <path
                  fill="url(#gradient)"
                  d="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z"
                />
                <image
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                  href="/images/profile.png"
                  className="profile-image"
                />
              </g>
            </svg>
          </div>
        </motion.div>
        
        <div className="about-text">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hi, I'm Omar Aglan
          </motion.h1>
          
          <motion.h2
            className="subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Full Stack & Game Developer
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            A passionate software developer specializing in both web and game development. 
            With a strong foundation in computer science and a creative mindset, I bridge the gap 
            between technical excellence and engaging user experiences. Currently focused on 
            building scalable web applications and immersive game experiences.
          </motion.p>

          <motion.button
            className="cv-button"
            onClick={handleDownloadCV}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1={12} y1={15} x2={12} y2={3}/>
            </svg>
            Download CV
          </motion.button>
          
          <motion.div 
            className="tech-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="tech-category">
              <h3>Web Development</h3>
              <div className="tech-items">
                <span>React</span>
                <span>Next.js</span>
                <span>Node.js</span>
                <span>TypeScript</span>
                <span>Express</span>
                <span>MongoDB</span>
              </div>
            </div>
            
            <div className="tech-category">
              <h3>Game Development</h3>
              <div className="tech-items">
                <span>Unity</span>
                <span>C#</span>
                <span>Blender</span>
                <span>GLSL</span>
                <span>Game Design</span>
                <span>3D Modeling</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>Other Skills</h3>
              <div className="tech-items">
                <span>Git</span>
                <span>Docker</span>
                <span>AWS</span>
                <span>CI/CD</span>
                <span>Agile</span>
                <span>UI/UX Design</span>
                <span>Problem Solving</span>
                <span>Team Leadership</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
