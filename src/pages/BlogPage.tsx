import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts, blogCategories, commonTags, sortOptions, type SortOption, type BlogCategory } from '../data/blogPosts';
import { EnhancedSearch } from '../components/EnhancedSearch/EnhancedSearch';
import { CircularReadingProgress } from '../components/ReadingProgress/ReadingProgress';
import BackButton from '../components/BackButton';
import './BlogPage.css';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [showTagsMenu, setShowTagsMenu] = useState(false);

  // Memoize filtered and sorted posts
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = blogPosts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags.includes(tag));
      
      return matchesCategory && matchesSearch && matchesTags;
    });

    // Sort posts
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [activeCategory, searchQuery, selectedTags, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };  return (
    <div className="blog-page">
      <div className="blog-navigation">
        <BackButton />
        <Link to="/" className="home-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Home
        </Link>
      </div>
      
      <motion.div 
        className="blog-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Blog</h1>
        <p>Thoughts, learnings, and insights from my journey in tech</p>
      </motion.div>

      <motion.div 
        className="blog-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="enhanced-search-container">
          <EnhancedSearch 
            posts={blogPosts}
            placeholder="Search articles, tags, categories..."
            maxResults={6}
            showSuggestions={true}
          />
        </div>

        <div className="filter-controls">
          <div className="category-filters">
            <button
              className={`category-button ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory('All');
                setCurrentPage(1);
              }}
            >
              All
            </button>
            {blogCategories.map(category => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="filter-actions">
            <div className="sort-control">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tags-filter">
              <button 
                className="tags-button"
                onClick={() => setShowTagsMenu(!showTagsMenu)}
              >
                Tags ({selectedTags.length})
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <AnimatePresence>
                {showTagsMenu && (
                  <motion.div 
                    className="tags-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {commonTags.map(tag => (
                      <button
                        key={tag}
                        className={`tag-option ${selectedTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="selected-tags">
            {selectedTags.map(tag => (
              <button
                key={tag}
                className="selected-tag"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            ))}
            <button
              className="clear-tags"
              onClick={() => setSelectedTags([])}
            >
              Clear All
            </button>
          </div>
        )}
      </motion.div>

      <motion.div 
        className="blog-grid"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {currentPosts.map((post, index) => (
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
              <div className="blog-card-content">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-time">{post.readTime} min read</span>
                </div>
                <div className="blog-tags">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="blog-tag"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTagToggle(tag);
                      }}
                    >
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
      
      {/* Circular Reading Progress */}
      <CircularReadingProgress />
    </div>
  );
};

export default BlogPage;
