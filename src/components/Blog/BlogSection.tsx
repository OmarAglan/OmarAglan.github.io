import { memo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import './Blog.css';

const BlogSection = memo(() => {
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <motion.section
      className="blog-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="section-separator"></div>
      <motion.h2 
        className="blog-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Latest Blog Posts
      </motion.h2>
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePostClick(post.id)}
          >
            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div className="blog-meta">
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <div className="blog-tags">
                {post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
});

BlogSection.displayName = 'BlogSection';

export default BlogSection;
