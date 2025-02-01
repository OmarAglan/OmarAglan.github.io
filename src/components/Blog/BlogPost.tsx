import { memo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import BackButton from '../BackButton';
import './Blog.css';

const BlogPost = memo(() => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    return (
      <div className="blog-post-error">
        <h2>Post not found</h2>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  return (
    <motion.article
      className="blog-post"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton />
      
      <header className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span>{new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <div className="blog-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="blog-post-content">
        {post.content.split('\n').map((paragraph, index) => {
          if (paragraph.trim().startsWith('•')) {
            return (
              <ul key={index} className="blog-list">
                <li>{paragraph.trim().substring(1).trim()}</li>
              </ul>
            );
          }
          
          if (paragraph.includes('----')) {
            return (
              <h2 key={index} className="blog-section-title">
                {paragraph.replace(/-/g, '').trim()}
              </h2>
            );
          }
          
          return paragraph.trim() && (
            <p key={index}>{paragraph.trim()}</p>
          );
        })}
      </div>
    </motion.article>
  );
});

BlogPost.displayName = 'BlogPost';

export default BlogPost;
