import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../../types/index';
import './RelatedPosts.css';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  maxPosts?: number;
  className?: string;
}

export function RelatedPosts({ 
  currentPost, 
  allPosts, 
  maxPosts = 3,
  className = '' 
}: RelatedPostsProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const relatedPosts = useMemo(() => {
    // Filter out current post
    const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
    
    // Calculate relevance scores
    const scoredPosts = otherPosts.map(post => {
      let score = 0;
      
      // Category match (highest weight)
      if (post.category === currentPost.category) {
        score += 10;
      }
      
      // Tag matches (high weight)
      const commonTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      score += commonTags.length * 5;
      
      // Recent posts bonus (if within 30 days)
      const postDate = new Date(post.date);
      const currentDate = new Date(currentPost.date);
      const daysDiff = Math.abs(currentDate.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff <= 30) {
        score += 2;
      }
      
      // Featured posts bonus
      if (post.featured) {
        score += 3;
      }
      
      // Title similarity (basic)
      const currentWords = currentPost.title.toLowerCase().split(' ');
      const postWords = post.title.toLowerCase().split(' ');
      const commonWords = currentWords.filter(word => 
        postWords.includes(word) && word.length > 3
      );
      score += commonWords.length;
      
      return { ...post, relevanceScore: score };
    });
    
    // Sort by relevance and return top posts
    return scoredPosts
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxPosts);
  }, [currentPost, allPosts, maxPosts]);

  if (relatedPosts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`related-posts ${className}`}>
      <motion.div
        className="related-posts-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Related Articles</h3>
        <p>Continue reading with these related posts</p>
      </motion.div>

      <div className="related-posts-grid">
        {relatedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="related-post-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
            whileHover={{ y: -5 }}
          >
            <Link to={`/blog/${post.id}`} className="related-post-link">
              {/* Category Badge */}
              <div className="post-category">
                {post.category}
              </div>

              {/* Post Content */}
              <div className="post-content">
                <h4 className="post-title">{post.title}</h4>
                <p className="post-excerpt">{post.excerpt}</p>
                
                <div className="post-meta">
                  <span className="post-date">{formatDate(post.date)}</span>
                  <span className="post-read-time">{post.readTime}</span>
                </div>

                {/* Tags */}
                <div className="post-tags">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="post-tag">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="post-tag-more">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Featured badge */}
                {post.featured && (
                  <div className="featured-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Featured
                  </div>
                )}
              </div>

              {/* Read More Arrow */}
              <div className="read-more-arrow">
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  animate={{
                    x: hoveredPost === post.id ? 5 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </motion.svg>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* View All Posts Link */}
      <motion.div
        className="view-all-posts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link to="/blog" className="view-all-link">
          <span>View All Posts</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12,5 19,12 12,19"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

// Compact version for sidebars
export function RelatedPostsCompact({ 
  currentPost, 
  allPosts, 
  maxPosts = 5,
  className = '' 
}: RelatedPostsProps) {
  const relatedPosts = useMemo(() => {
    const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
    
    const scoredPosts = otherPosts.map(post => {
      let score = 0;
      
      if (post.category === currentPost.category) score += 10;
      
      const commonTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      score += commonTags.length * 5;
      
      if (post.featured) score += 3;
      
      return { ...post, relevanceScore: score };
    });
    
    return scoredPosts
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxPosts);
  }, [currentPost, allPosts, maxPosts]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className={`related-posts-compact ${className}`}>
      <h4>You might also like</h4>
      <div className="compact-posts-list">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="compact-post-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={`/blog/${post.id}`} className="compact-post-link">
              <div className="compact-post-content">
                <h5>{post.title}</h5>
                <div className="compact-post-meta">
                  <span className="compact-category">{post.category}</span>
                  <span className="compact-read-time">{post.readTime}</span>
                </div>
              </div>
              <div className="compact-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Related posts based on tags only
export function RelatedPostsByTags({ 
  tags, 
  allPosts, 
  currentPostId,
  maxPosts = 4,
  className = '' 
}: {
  tags: string[];
  allPosts: BlogPost[];
  currentPostId?: string;
  maxPosts?: number;
  className?: string;
}) {
  const relatedPosts = useMemo(() => {
    const otherPosts = allPosts.filter(post => 
      post.id !== currentPostId && 
      post.tags.some(tag => tags.includes(tag))
    );
    
    const scoredPosts = otherPosts.map(post => {
      const commonTags = post.tags.filter(tag => tags.includes(tag));
      return { ...post, commonTagsCount: commonTags.length };
    });
    
    return scoredPosts
      .sort((a, b) => b.commonTagsCount - a.commonTagsCount)
      .slice(0, maxPosts);
  }, [tags, allPosts, currentPostId, maxPosts]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className={`related-posts-by-tags ${className}`}>
      <h4>Posts with similar tags</h4>
      <div className="tag-related-grid">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="tag-related-item"
          >
            <h5>{post.title}</h5>
            <div className="common-tags">
              {post.tags.filter(tag => tags.includes(tag)).map((tag) => (
                <span key={tag} className="common-tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
