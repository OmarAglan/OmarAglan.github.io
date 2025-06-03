import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { blogPosts } from '../../data/blogPosts';
import { parseContent, extractHeadings, generateHeadingId } from '../../utils/contentParser';
import { renderInlineMarkdown, renderTable } from '../../utils/markdownRenderer';
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
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('glsl', glsl);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sql', sql);

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
  const tableOfContents = extractHeadings(parsedContent);

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
        </div>        <div className="blog-post-content">
          {parsedContent.map((section, index) => {
            switch (section.type) {
              case 'heading': {
                const headingId = generateHeadingId(section.content[0]);
                const [ref] = sectionRefs[index] || [];
                const HeadingTag = `h${Math.min(section.meta?.level || 1, 6)}` as keyof JSX.IntrinsicElements;
                
                return (
                  <motion.div
                    ref={ref}
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <HeadingTag
                      id={headingId}
                      className="section-heading"
                    >
                      {section.content[0]}
                    </HeadingTag>
                  </motion.div>
                );
              }

              case 'paragraph':
                return (
                  <div key={index} className="section-paragraph">
                    {section.content.map((line, lineIndex) => (
                      <p key={lineIndex}>
                        {renderInlineMarkdown(line)}
                      </p>
                    ))}
                  </div>
                );

              case 'list':
                const ListTag = section.meta?.ordered ? 'ol' : 'ul';
                return (
                  <ListTag key={index} className={`section-list ${section.meta?.ordered ? 'ordered' : 'unordered'}`}>
                    {section.content.map((item, i) => (
                      <li key={i}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ListTag>
                );

              case 'code':
                return (
                  <div key={index} className="section-code">
                    {renderCodeBlock({ 
                      language: section.meta?.language || 'text', 
                      value: section.content.join('\n') 
                    })}
                  </div>
                );

              case 'image':
                return (
                  <figure key={index} className="section-image">
                    <img
                      src={section.meta?.src}
                      alt={section.meta?.alt || ''}
                      title={section.meta?.title}
                      loading="lazy"
                      style={{
                        width: section.meta?.width || 'auto',
                        height: section.meta?.height || 'auto'
                      }}
                    />
                    {(section.meta?.alt || section.meta?.title) && (
                      <figcaption>{section.meta?.title || section.meta?.alt}</figcaption>
                    )}
                  </figure>
                );

              case 'blockquote':
                return (
                  <blockquote key={index} className="section-blockquote">
                    {section.content.map((line, lineIndex) => (
                      <p key={lineIndex}>{renderInlineMarkdown(line)}</p>
                    ))}
                  </blockquote>
                );

              case 'table':
                return (
                  <div key={index} className="section-table">
                    {renderTable(section)}
                  </div>
                );

              case 'hr':
                return <hr key={index} className="section-hr" />;

              case 'html':
                return (
                  <div 
                    key={index} 
                    className="section-html"
                    dangerouslySetInnerHTML={{ __html: section.content.join('\n') }}
                  />
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
