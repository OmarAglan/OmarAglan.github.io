import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../../types';
import { blogPosts } from '../../data/blogPosts';
import './BlogSection.css';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
  <motion.div
    className="blog-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Link to={`/blog/${post.slug}`} className="blog-card-link">
      <div className="blog-card-content">
        <h3>{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-meta">
          <span>{post.date}</span>
          {post.readTime && (
            <span>{post.readTime} min read</span>
          )}
        </div>
        <div className="blog-tags">
          {post.tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  </motion.div>
);

const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(4);

  const categories = useMemo(() => {
    const allCategories = blogPosts.map(post => post.category);
    return ['All', ...new Set(allCategories)].filter(Boolean);
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => activeCategory === 'All' || post.category === activeCategory)
      .slice(0, visiblePosts);
  }, [activeCategory, visiblePosts]);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
    setVisiblePosts(4);
  }, []);

  const loadMore = useCallback(() => {
    setVisiblePosts(prev => prev + 4);
  }, []);

  const hasMorePosts = filteredPosts.length < 
    blogPosts.filter(post => activeCategory === 'All' || post.category === activeCategory).length;

  return (
    <section className="blog-section">
      <div className="blog-content">
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="blog-title">Latest Blog Posts</h2>
          <p className="blog-subtitle">Insights and experiences from my journey in tech</p>
          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="blog-grid"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="blog-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {hasMorePosts ? (
            <button onClick={loadMore} className="view-all-button">
              Load More Posts
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          ) : (
            <Link to="/blog" className="view-all-button">
              View All Posts
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
