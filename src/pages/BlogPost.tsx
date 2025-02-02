import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './BlogPost.css';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find(post => post.id === id);

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <motion.article 
      className="blog-post"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="blog-post-header">
        <Link to="/blog" className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1={19} y1={12} x2={5} y2={12}/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Blog
        </Link>
        {post.coverImage && (
          <div className="blog-post-cover">
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}
        <div className="blog-post-meta">
          <span className="blog-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-info">
            <span className="post-date">{post.date}</span>
            <span className="post-read-time">{post.readTime} min read</span>
            {post.author && <span className="post-author">By {post.author}</span>}
          </div>
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="post-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="blog-post-content">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="blog-post-footer">
        <h3>Continue Reading</h3>
        <div className="related-posts">
          {blogPosts
            .filter(p => p.id !== post.id && p.category === post.category)
            .slice(0, 2)
            .map(relatedPost => (
              <Link 
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="related-post-card"
              >
                {relatedPost.coverImage && (
                  <img src={relatedPost.coverImage} alt={relatedPost.title} />
                )}
                <div className="related-post-content">
                  <h4>{relatedPost.title}</h4>
                  <p>{relatedPost.excerpt}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
