// src/utils/markdownRenderer.tsx
// Enhanced markdown renderer for blog posts

import React from 'react';
import { parseContent, type ParsedSection } from './contentParser';

interface CodeBlockProps {
  language?: string;
  children: string[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => (
  <pre className={`code-block ${language ? `language-${language}` : ''}`}>
    <code>
      {children.join('\n')}
    </code>
  </pre>
);

interface TableProps {
  headers?: string[];
  rows: string[][];
  align?: ('left' | 'center' | 'right' | 'none')[];
}

const Table: React.FC<TableProps> = ({ headers, rows, align = [] }) => (
  <div className="markdown-table-wrapper">
    <table className="markdown-table">
      {headers && headers.length > 0 && (
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index} 
                style={{ textAlign: align[index] === 'none' ? 'left' : align[index] }}
                className={`markdown-table-header ${align[index] || 'left'}`}
              >
                {renderInlineMarkdown(header)}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td 
                key={cellIndex}
                style={{ textAlign: align[cellIndex] === 'none' ? 'left' : align[cellIndex] }}
                className={`markdown-table-cell ${align[cellIndex] || 'left'}`}
              >
                {renderInlineMarkdown(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Export the Table component for use in BlogPost
export const renderTable = (section: ParsedSection) => {
  const tableRows = section.content.map(row => row.split('|').map(cell => cell.trim()));
  const headers = section.meta?.headers;
  const bodyRows = headers ? tableRows : tableRows.slice(1);
  
  return (
    <Table
      headers={headers}
      rows={bodyRows}
      align={section.meta?.align}
    />
  );
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  const sections = parseContent(content);
  const renderSection = (section: ParsedSection, index: number) => {
    const key = `section-${index}`;

    switch (section.type) {
      case 'heading':
        const HeadingTag = `h${Math.min(section.meta?.level || 1, 6)}` as keyof JSX.IntrinsicElements;
        const headingId = section.content[0]
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        return (
          <HeadingTag key={key} id={headingId} className="markdown-heading">
            {renderInlineMarkdown(section.content[0])}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p key={key} className="markdown-paragraph">
            {section.content.map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {renderInlineMarkdown(line)}
                {lineIndex < section.content.length - 1 && ' '}
              </React.Fragment>
            ))}
          </p>
        );

      case 'list':
        const ListTag = section.meta?.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={key} className={`markdown-list ${section.meta?.ordered ? 'ordered' : 'unordered'}`}>
            {section.content.map((item, itemIndex) => (
              <li key={itemIndex} className="markdown-list-item">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ListTag>
        );

      case 'code':
        return (
          <CodeBlock key={key} language={section.meta?.language}>
            {section.content}
          </CodeBlock>
        );

      case 'image':
        return (
          <div key={key} className="markdown-image-container">
            <img
              src={section.meta?.src}
              alt={section.meta?.alt || ''}
              title={section.meta?.title}
              className="markdown-image"
              loading="lazy"
              style={{
                width: section.meta?.width || 'auto',
                height: section.meta?.height || 'auto'
              }}
            />
            {(section.meta?.alt || section.meta?.title) && (
              <figcaption className="markdown-image-caption">
                {section.meta?.title || section.meta?.alt}
              </figcaption>
            )}
          </div>
        );

      case 'blockquote':
        return (
          <blockquote key={key} className="markdown-blockquote">
            {section.content.map((line, lineIndex) => (
              <p key={lineIndex}>{renderInlineMarkdown(line)}</p>
            ))}
          </blockquote>
        );

      case 'table':
        const tableRows = section.content.map(row => row.split('|'));
        const headers = section.meta?.headers;
        const bodyRows = headers ? tableRows : tableRows.slice(1);
        
        return (
          <Table
            key={key}
            headers={headers}
            rows={bodyRows}
            align={section.meta?.align}
          />
        );

      case 'hr':
        return <hr key={key} className="markdown-hr" />;

      case 'html':
        return (
          <div 
            key={key} 
            className="markdown-html"
            dangerouslySetInnerHTML={{ __html: section.content.join('\n') }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`markdown-content ${className}`}>
      {sections.map(renderSection)}
    </div>
  );
};

// Helper function to render inline markdown (bold, italic, links, inline code)
export const renderInlineMarkdown = (text: string): React.ReactNode => {
  // Handle inline code first to avoid conflicts
  let parts: (string | React.ReactNode)[] = [text];
  
  // Inline code (highest priority)
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(`[^`]+`)/).map((segment, index) => {
      if (segment.startsWith('`') && segment.endsWith('`')) {
        return <code key={`code-${index}`} className="inline-code">{segment.slice(1, -1)}</code>;
      }
      return segment;
    });
  });

  // Bold text (before italic to handle **text**)
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(\*\*[^*]+\*\*)/).map((segment, index) => {
      if (segment.startsWith('**') && segment.endsWith('**')) {
        return <strong key={`bold-${index}`}>{segment.slice(2, -2)}</strong>;
      }
      return segment;
    });
  });

  // Italic text (single asterisks, but not double)
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(\*[^*]+\*)/).map((segment, index) => {
      if (segment.startsWith('*') && segment.endsWith('*') && !segment.startsWith('**') && !segment.endsWith('***')) {
        return <em key={`italic-${index}`}>{segment.slice(1, -1)}</em>;
      }
      return segment;
    });
  });

  // Strikethrough
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(~~[^~]+~~)/).map((segment, index) => {
      if (segment.startsWith('~~') && segment.endsWith('~~')) {
        return <del key={`strike-${index}`}>{segment.slice(2, -2)}</del>;
      }
      return segment;
    });
  });

  // Links with improved regex
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(\[[^\]]+\]\([^)]+\))/).map((segment, index) => {
      const linkMatch = segment.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <a 
            key={`link-${index}`} 
            href={url.trim()} 
            className="markdown-link"
            target={url.startsWith('http') ? '_blank' : '_self'}
            rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {linkText}
          </a>
        );
      }
      return segment;
    });
  });

  // Highlight/mark text
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(==[^=]+==[^=])/).map((segment, index) => {
      if (segment.startsWith('==') && segment.endsWith('==')) {
        return <mark key={`mark-${index}`}>{segment.slice(2, -2)}</mark>;
      }
      return segment;
    });
  });

  // Subscript
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(~[^~]+~)/).map((segment, index) => {
      if (segment.startsWith('~') && segment.endsWith('~') && !segment.startsWith('~~')) {
        return <sub key={`sub-${index}`}>{segment.slice(1, -1)}</sub>;
      }
      return segment;
    });
  });

  // Superscript
  parts = parts.flatMap(part => {
    if (typeof part !== 'string') return [part];
    return part.split(/(\^[^^]+\^)/).map((segment, index) => {
      if (segment.startsWith('^') && segment.endsWith('^')) {
        return <sup key={`sup-${index}`}>{segment.slice(1, -1)}</sup>;
      }
      return segment;
    });
  });

  return parts.filter(part => part !== '');
};

export default MarkdownRenderer;
