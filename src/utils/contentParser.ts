// Enhanced content parser for better markdown handling

export interface ParsedSection {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'image' | 'blockquote' | 'table' | 'hr' | 'html';
  content: string[];
  meta?: {
    language?: string;
    alt?: string;
    src?: string;
    level?: number; // For headings
    ordered?: boolean; // For lists
    headers?: string[]; // For tables
    align?: ('left' | 'center' | 'right' | 'none')[]; // For table alignment
    title?: string; // For images
    width?: string; // For images
    height?: string; // For images
  };
}

export function parseContent(content: string): ParsedSection[] {
  const lines = content.trim().split('\n');
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockInfo = '';

  function finishCurrentSection() {
    if (currentSection && currentSection.content.length > 0) {
      sections.push(currentSection);
      currentSection = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip empty lines unless we're in a code block
    if (!trimmedLine && !inCodeBlock) {
      finishCurrentSection();
      continue;
    }

    // Handle horizontal rules
    if (trimmedLine.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
      finishCurrentSection();
      sections.push({
        type: 'hr',
        content: ['---']
      });
      continue;
    }

    // Handle code block start
    if (trimmedLine.startsWith('```') || trimmedLine.startsWith('~~~')) {
      finishCurrentSection();
      inCodeBlock = true;
      codeBlockInfo = trimmedLine.slice(3).trim();
      // Extract language and additional info
      const parts = codeBlockInfo.split(/\s+/);
      codeBlockLanguage = parts[0] || '';
      
      currentSection = {
        type: 'code',
        content: [],
        meta: { 
          language: codeBlockLanguage,
        }
      };
      continue;
    }

    // Handle code block end
    if (inCodeBlock && (trimmedLine === '```' || trimmedLine === '~~~')) {
      inCodeBlock = false;
      finishCurrentSection();
      continue;
    }

    // Inside code block
    if (inCodeBlock && currentSection?.type === 'code') {
      currentSection.content.push(line); // Preserve original formatting
      continue;
    }

    // Handle ATX headings (# ## ### etc.)
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+?)(?:\s*#{1,6})?$/);
    if (headingMatch) {
      finishCurrentSection();
      const level = headingMatch[1].length;
      sections.push({
        type: 'heading',
        content: [headingMatch[2].trim()],
        meta: { level }
      });
      continue;
    }

    // Handle Setext headings (underlined with = or -)
    if (i + 1 < lines.length) {
      const nextLine = lines[i + 1]?.trim();
      if (nextLine && (nextLine.match(/^=+$/) || nextLine.match(/^-+$/))) {
        finishCurrentSection();
        const level = nextLine.startsWith('=') ? 1 : 2;
        sections.push({
          type: 'heading',
          content: [trimmedLine],
          meta: { level }
        });
        i++; // Skip the underline
        continue;
      }
    }

    // Handle tables
    if (trimmedLine.includes('|') && trimmedLine.split('|').length >= 3) {
      const isTableRow = trimmedLine.startsWith('|') || trimmedLine.endsWith('|') || trimmedLine.split('|').length >= 3;
      
      if (isTableRow) {
        if (!currentSection || currentSection.type !== 'table') {
          finishCurrentSection();
          currentSection = {
            type: 'table',
            content: [],
            meta: { headers: [], align: [] }
          };
        }
        
        // Parse table row
        const cells = trimmedLine.split('|').map(cell => cell.trim()).filter(cell => cell);
        currentSection.content.push(cells.join('|'));
        
        // Check if next line is separator (for header detection)
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1]?.trim();
          if (nextLine && nextLine.match(/^[\|\s:-]+$/)) {
            // This is a header separator
            if (!currentSection.meta?.headers?.length) {
              currentSection.meta!.headers = cells;
            }
            
            // Parse alignment from separator
            const alignments = nextLine.split('|').map(cell => {
              const cleaned = cell.trim();
              if (cleaned.startsWith(':') && cleaned.endsWith(':')) return 'center';
              if (cleaned.endsWith(':')) return 'right';
              if (cleaned.startsWith(':')) return 'left';
              return 'none';
            }).filter(align => align !== 'none');
            
            currentSection.meta!.align = alignments as ('left' | 'center' | 'right' | 'none')[];
            i++; // Skip separator line
          }
        }
        continue;
      }
    }

    // Handle enhanced images with title and dimensions
    const enhancedImageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]*)")?\s*(?:\{([^}]*)\})?\)$/);
    if (enhancedImageMatch) {
      finishCurrentSection();
      const [, alt, src, title, attributes] = enhancedImageMatch;
      
      const meta: ParsedSection['meta'] = {
        alt: alt || '',
        src: src.trim(),
        title: title || undefined
      };
      
      // Parse attributes like {width="100px" height="200px"}
      if (attributes) {
        const attrMatch = attributes.match(/(\w+)=["']([^"']+)["']/g);
        if (attrMatch) {
          attrMatch.forEach(attr => {
            const [key, value] = attr.split('=');
            const cleanValue = value.replace(/["']/g, '');
            if (key === 'width') meta.width = cleanValue;
            if (key === 'height') meta.height = cleanValue;
          });
        }
      }
      
      sections.push({
        type: 'image',
        content: [],
        meta
      });
      continue;
    }

    // Handle basic images
    const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      finishCurrentSection();
      sections.push({
        type: 'image',
        content: [],
        meta: {
          alt: imageMatch[1],
          src: imageMatch[2]
        }
      });
      continue;
    }

    // Handle blockquotes (can be nested)
    if (trimmedLine.startsWith('>')) {
      if (!currentSection || currentSection.type !== 'blockquote') {
        finishCurrentSection();
        currentSection = {
          type: 'blockquote',
          content: []
        };
      }
      // Handle nested blockquotes
      let quoteContent = trimmedLine.slice(1).trim();
      while (quoteContent.startsWith('>')) {
        quoteContent = '>' + quoteContent.slice(1).trim();
      }
      currentSection.content.push(quoteContent);
      continue;
    }

    // Handle ordered lists
    const orderedListMatch = trimmedLine.match(/^(\d+)\.(\s+)(.+)$/);
    if (orderedListMatch) {
      if (!currentSection || currentSection.type !== 'list' || !currentSection.meta?.ordered) {
        finishCurrentSection();
        currentSection = {
          type: 'list',
          content: [],
          meta: { ordered: true }
        };
      }
      currentSection.content.push(orderedListMatch[3]);
      continue;
    }

    // Handle unordered lists with better detection
    const unorderedListMatch = trimmedLine.match(/^([\*\-\+])(\s+)(.+)$/);
    if (unorderedListMatch) {
      if (!currentSection || currentSection.type !== 'list' || currentSection.meta?.ordered) {
        finishCurrentSection();
        currentSection = {
          type: 'list',
          content: [],
          meta: { ordered: false }
        };
      }
      currentSection.content.push(unorderedListMatch[3]);
      continue;
    }

    // Handle HTML content (basic detection)
    if (trimmedLine.startsWith('<') && trimmedLine.includes('>')) {
      if (!currentSection || currentSection.type !== 'html') {
        finishCurrentSection();
        currentSection = {
          type: 'html',
          content: []
        };
      }
      currentSection.content.push(trimmedLine);
      continue;
    }

    // Handle paragraphs
    if (!currentSection || currentSection.type !== 'paragraph') {
      finishCurrentSection();
      currentSection = {
        type: 'paragraph',
        content: []
      };
    }
    currentSection.content.push(trimmedLine);
  }

  // Don't forget to finish the last section
  finishCurrentSection();
  return sections;
}

export function generateTableOfContents(sections: ParsedSection[]) {
  return sections
    .filter(section => section.type === 'heading')
    .map(section => ({
      id: section.content[0]
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
      title: section.content[0],
      level: section.meta?.level || 1
    }));
}

// Additional utility functions for content processing

export function extractTextContent(sections: ParsedSection[]): string {
  return sections
    .filter(section => section.type === 'paragraph' || section.type === 'heading')
    .map(section => section.content.join(' '))
    .join(' ');
}

export function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function estimateReadingTime(content: string, wordsPerMinute: number = 200): string {
  const wordCount = countWords(content);
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function findCodeBlocks(sections: ParsedSection[]): ParsedSection[] {
  return sections.filter(section => section.type === 'code');
}

export function findImages(sections: ParsedSection[]): ParsedSection[] {
  return sections.filter(section => section.type === 'image');
}

export function findTables(sections: ParsedSection[]): ParsedSection[] {
  return sections.filter(section => section.type === 'table');
}

export function extractHeadings(sections: ParsedSection[]): Array<{id: string, title: string, level: number}> {
  return sections
    .filter(section => section.type === 'heading')
    .map(section => ({
      id: generateHeadingId(section.content[0]),
      title: section.content[0],
      level: section.meta?.level || 1
    }));
}

export function generateHeadingId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function processInlineMarkdown(text: string): string {
  // This function can be used to convert inline markdown to HTML or other formats
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function validateMarkdownContent(content: string): Array<{line: number, message: string}> {
  const issues: Array<{line: number, message: string}> = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Check for unclosed code blocks
    if (line.trim().startsWith('```') && !line.trim().endsWith('```')) {
      const codeBlockEnd = lines.slice(index + 1).findIndex(l => l.trim() === '```');
      if (codeBlockEnd === -1) {
        issues.push({
          line: lineNumber,
          message: 'Unclosed code block'
        });
      }
    }
    
    // Check for malformed links
    const linkMatches = line.match(/\[([^\]]*)\]\(([^)]*)\)/g);
    if (linkMatches) {
      linkMatches.forEach(match => {
        if (!match.includes('](')) {
          issues.push({
            line: lineNumber,
            message: 'Malformed link syntax'
          });
        }
      });
    }
    
    // Check for malformed images
    const imageMatches = line.match(/!\[([^\]]*)\]\(([^)]*)\)/g);
    if (imageMatches) {
      imageMatches.forEach(match => {
        if (!match.includes('](')) {
          issues.push({
            line: lineNumber,
            message: 'Malformed image syntax'
          });
        }
      });
    }
  });
  
  return issues;
}

export function optimizeContent(sections: ParsedSection[]): ParsedSection[] {
  // Merge consecutive paragraphs if they should be one
  const optimized: ParsedSection[] = [];
  
  for (let i = 0; i < sections.length; i++) {
    const current = sections[i];
    const next = sections[i + 1];
    
    // Merge consecutive paragraphs that are actually one paragraph
    if (current.type === 'paragraph' && next?.type === 'paragraph') {
      // Check if they should be merged (no empty line between them in original)
      const mergedContent = [...current.content, ...next.content];
      optimized.push({
        ...current,
        content: mergedContent
      });
      i++; // Skip next section as it's been merged
    } else {
      optimized.push(current);
    }
  }
  
  return optimized;
}
