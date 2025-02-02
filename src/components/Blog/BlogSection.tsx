import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '../../data/blogPosts';
import './BlogSection.css';

const ITEMS_PER_PAGE = 4;

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(ITEMS_PER_PAGE);

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => {
    const allCategories = blogPosts.map(post => post.category);
    return ['All', ...new Set(allCategories)].filter(Boolean);
  }, []);

  // Memoize filtered posts for performance
  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => activeCategory === 'All' || post.category === activeCategory)
      .slice(0, visiblePosts);
  }, [activeCategory, visiblePosts]);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
    setVisiblePosts(ITEMS_PER_PAGE);
  }, []);

  const loadMore = useCallback(() => {
    setVisiblePosts(prev => prev + ITEMS_PER_PAGE);
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
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="blog-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {post.coverImage && (
                  <div className="blog-card-image">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      loading="lazy"
                      width="400"
                      height="225"
                    />
                    {post.category && (
                      <span className="blog-category">{post.category}</span>
                    )}
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    {post.readTime && (
                      <span className="blog-read-time">{post.readTime} min read</span>
                    )}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-tags">
                    {post.tags?.map((tag, index) => (
                      <span key={index} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/blog/${post.id}`} className="read-more">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                </div>
              </motion.article>
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
