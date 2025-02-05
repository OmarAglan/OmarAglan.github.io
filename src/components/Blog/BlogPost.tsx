import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { blogPosts } from '../../data/blogPosts';
import { parseContent, generateTableOfContents } from '../../utils/contentParser';
import BackButton from '../BackButton';
import './Blog.css';

// Import commonly used languages
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import glsl from 'react-syntax-highlighter/dist/esm/languages/hljs/glsl';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('glsl', glsl);

const BlogPost = memo(() => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('');

  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="blog-post-error">
        <h2>Post not found</h2>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  const parsedContent = parseContent(post.content);
  const tableOfContents = generateTableOfContents(parsedContent);

  // Create a ref for each heading
  const sectionRefs = tableOfContents.map(() => useInView({
    threshold: 0.5,
  }));

  // Update active section based on scroll position
  useEffect(() => {
    const activeIndex = sectionRefs.findIndex(({ inView }) => inView);
    if (activeIndex !== -1) {
      setActiveSection(tableOfContents[activeIndex].id);
    }
  }, [sectionRefs, tableOfContents]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCodeBlock = ({ language, value }: { language: string; value: string }) => {
    return (
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{ margin: '1em 0' }}
      >
        {value}
      </SyntaxHighlighter>
    );
  };

  return (
    <motion.div
      className="blog-post-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <aside className="blog-sidebar">
        {/* Table of Contents */}
        <nav className="table-of-contents">
          <h3>Contents</h3>
          <ul>
            {tableOfContents.map(({ id, title }) => (
              <li 
                key={id}
                className={activeSection === id ? 'active' : ''}
              >
                <button onClick={() => scrollToSection(id)}>
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <BackButton />
      </aside>

      <article className="blog-post">
        <div className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span className="date">{post.date}</span>
            <span className="read-time">{post.readTime}</span>
          </div>
          <div className="tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="blog-post-content">
          {parsedContent.map((section, index) => {
            switch (section.type) {
              case 'heading': {
                const headingId = section.content[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const [ref] = sectionRefs[index] || [];
                return (
                  <motion.h2
                    ref={ref}
                    id={headingId}
                    key={index}
                    className="section-heading"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {section.content[0]}
                  </motion.h2>
                );
              }

              case 'paragraph':
                return (
                  <p key={index} className="section-paragraph">
                    {section.content.join(' ')}
                  </p>
                );

              case 'list':
                return (
                  <ul key={index} className="section-list">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );

              case 'code':
                return (
                  <div key={index} className="section-code">
                    {renderCodeBlock({ language: section.meta?.language || 'typescript', value: section.content.join('\n') })}
                  </div>
                );

              case 'image':
                return (
                  <figure key={index} className="section-image">
                    <img
                      src={section.meta?.src}
                      alt={section.meta?.alt}
                      loading="lazy"
                    />
                    {section.meta?.alt && (
                      <figcaption>{section.meta.alt}</figcaption>
                    )}
                  </figure>
                );

              default:
                return null;
            }
          })}
        </div>
      </article>
    </motion.div>
  );
});

export default BlogPost;
