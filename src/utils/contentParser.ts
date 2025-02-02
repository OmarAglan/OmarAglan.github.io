interface ParsedSection {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'image';
  content: string[];
  meta?: {
    language?: string;
    alt?: string;
    src?: string;
  };
}

export function parseContent(content: string): ParsedSection[] {
  const lines = content.trim().split('\n').map(line => line.trim());
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let inCodeBlock = false;

  function finishCurrentSection() {
    if (currentSection) {
      sections.push(currentSection);
      currentSection = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines unless we're in a code block
    if (!line && !inCodeBlock) {
      finishCurrentSection();
      continue;
    }

    // Handle code block start
    if (line.startsWith('CODE:') || line.startsWith('\`\`\`')) {
      finishCurrentSection();
      inCodeBlock = true;
      const language = line.startsWith('CODE:') 
        ? line.slice(5).trim()
        : line.slice(3).trim();
      currentSection = {
        type: 'code',
        content: [],
        meta: { language }
      };
      continue;
    }

    // Handle code block end
    if (line === 'END_CODE' || line === '\`\`\`') {
      inCodeBlock = false;
      finishCurrentSection();
      continue;
    }

    // Inside code block
    if (inCodeBlock && currentSection?.type === 'code') {
      currentSection.content.push(line);
      continue;
    }

    // Handle images
    if (line.startsWith('![') && line.includes('](') && line.endsWith(')')) {
      finishCurrentSection();
      const altEnd = line.indexOf(']');
      const srcStart = line.indexOf('(') + 1;
      const srcEnd = line.length - 1;
      
      sections.push({
        type: 'image',
        content: [],
        meta: {
          alt: line.slice(2, altEnd),
          src: line.slice(srcStart, srcEnd)
        }
      });
      continue;
    }

    // Handle headings (lines followed by dashes)
    if (i < lines.length - 1 && lines[i + 1].match(/^-+$/)) {
      finishCurrentSection();
      currentSection = {
        type: 'heading',
        content: [line]
      };
      i++; // Skip the dashes line
      finishCurrentSection();
      continue;
    }

    // Handle lists (lines starting with • or -)
    if (line.startsWith('•') || line.startsWith('-')) {
      if (!currentSection || currentSection.type !== 'list') {
        finishCurrentSection();
        currentSection = {
          type: 'list',
          content: []
        };
      }
      currentSection.content.push(line.replace(/^[•-]\s*/, ''));
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
    currentSection.content.push(line);
  }

  // Don't forget to finish the last section
  finishCurrentSection();
  return sections;
}

export function generateTableOfContents(sections: ParsedSection[]) {
  return sections
    .filter(section => section.type === 'heading')
    .map(section => ({
      id: section.content[0].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: section.content[0],
      level: 1
    }));
}
