import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { fullStackProjects } from '../data/fullStackProjects';
import BackButton from './BackButton';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = fullStackProjects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <button onClick={() => navigate('/portfolio')}>Back to Portfolio</button>
      </div>
    );
  }

  return (
    <motion.div
      className="project-details-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton />
      
      <div className="project-header">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {project.title}
        </motion.h1>
        
        <div className="project-meta">
          <div className="tech-stack">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="project-timeline">
            {project.timeline && (
              <span>
                {project.timeline.started} - {project.timeline.completed || 'Present'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="project-content">
        <div className="project-image-large">
          <img src={project.imageUrl} alt={project.title} />
        </div>

        <div className="project-section">
          <h2>Overview</h2>
          <p>{project.detailedDescription || project.description}</p>
        </div>

        {project.features && (
          <div className="project-section">
            <h2>Key Features</h2>
            <ul>
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-challenges-solutions">
          {project.challenges && (
            <div className="project-section">
              <h2>Challenges</h2>
              <ul>
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {project.solutions && (
            <div className="project-section">
              <h2>Solutions</h2>
              <ul>
                {project.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="project-links">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link demo"
            >
              View Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link github"
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
