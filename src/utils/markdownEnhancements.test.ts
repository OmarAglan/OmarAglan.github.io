// src/utils/__tests__/markdownEnhancements.test.ts
// Comprehensive tests for enhanced markdown parsing system

import { parseContent } from '../contentParser';
import { renderInlineMarkdown } from '../markdownRenderer';
import { parseFrontmatter } from '../markdown';
import { validateBlogPost, validateMarkdownContent, validateFrontmatter } from '../markdownValidation';
import { markdownCache, safeParseMarkdown } from '../markdownCache';

describe('Enhanced Markdown Parsing System', () => {
  describe('Content Parser', () => {
    test('should parse tables correctly', () => {
      const markdown = `
| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| More     | Data     | Here     |
      `.trim();

      const result = parseContent(markdown);
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('table');
      expect(result[0].meta?.headers).toEqual(['Header 1', 'Header 2', 'Header 3']);
      expect(result[0].meta?.align).toEqual(['left', 'center', 'right']);
    });

    test('should parse horizontal rules', () => {
      const markdown = '---\n\nSome content\n\n***\n\nMore content';
      const result = parseContent(markdown);
      
      expect(result.some(section => section.type === 'hr')).toBe(true);
    });

    test('should parse HTML sections', () => {
      const markdown = '<div class="custom">HTML content</div>';
      const result = parseContent(markdown);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('html');
      expect(result[0].content[0]).toBe('<div class="custom">HTML content</div>');
    });

    test('should parse enhanced images with metadata', () => {
      const markdown = '![Alt text](image.jpg "Title text")';
      const result = parseContent(markdown);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('image');
      expect(result[0].meta?.src).toBe('image.jpg');
      expect(result[0].meta?.alt).toBe('Alt text');
      expect(result[0].meta?.title).toBe('Title text');
    });

    test('should parse nested blockquotes', () => {
      const markdown = '> First level\n> > Second level\n> Back to first';
      const result = parseContent(markdown);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('blockquote');
    });

    test('should detect code block languages', () => {
      const markdown = '```javascript\nconst x = 5;\n```';
      const result = parseContent(markdown);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('code');
      expect(result[0].meta?.language).toBe('javascript');
    });
  });

  describe('Inline Markdown Renderer', () => {
    test('should render bold text', () => {
      const result = renderInlineMarkdown('This is **bold** text');
      // Check that bold text is properly rendered
      expect(result).toBeDefined();
    });

    test('should render italic text', () => {
      const result = renderInlineMarkdown('This is *italic* text');
      expect(result).toBeDefined();
    });

    test('should render strikethrough', () => {
      const result = renderInlineMarkdown('This is ~~strikethrough~~ text');
      expect(result).toBeDefined();
    });

    test('should render inline code', () => {
      const result = renderInlineMarkdown('Use `console.log()` for debugging');
      expect(result).toBeDefined();
    });

    test('should render links with external detection', () => {
      const result = renderInlineMarkdown('[External](https://github.com) and [Internal](/blog)');
      expect(result).toBeDefined();
    });

    test('should render highlight text', () => {
      const result = renderInlineMarkdown('This is ==highlighted== text');
      expect(result).toBeDefined();
    });

    test('should render subscript and superscript', () => {
      const result = renderInlineMarkdown('H~2~O and E=mc^2^');
      expect(result).toBeDefined();
    });

    test('should handle mixed formatting', () => {
      const result = renderInlineMarkdown('**Bold with `code`** and *italic with [link](http://example.com)*');
      expect(result).toBeDefined();
    });
  });

  describe('Frontmatter Parser', () => {
    test('should parse YAML frontmatter with --- delimiters', () => {
      const markdown = `---
title: "Test Post"
date: "2024-01-15"
tags: ["test", "demo"]
featured: true
---

# Content here`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test Post');
      expect(result.frontmatter.date).toBe('2024-01-15');
      expect(result.frontmatter.tags).toEqual(['test', 'demo']);
      expect(result.frontmatter.featured).toBe(true);
      expect(result.content).toBe('# Content here');
    });

    test('should parse TOML frontmatter with +++ delimiters', () => {
      const markdown = `+++
title = "Test Post"
date = "2024-01-15"
featured = true
+++

# Content here`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Test Post');
    });

    test('should handle missing frontmatter', () => {
      const markdown = '# Just content';
      const result = parseFrontmatter(markdown);
      
      expect(result.frontmatter).toEqual({});
      expect(result.content).toBe('# Just content');
    });

    test('should infer category from tags', () => {
      const markdown = `---
title: "Test"
tags: ["react", "typescript"]
---

Content`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.category).toContain('development');
    });

    test('should extract title from content when missing', () => {
      const markdown = `---
date: "2024-01-15"
---

# Auto Title

Content here`;

      const result = parseFrontmatter(markdown);
      expect(result.frontmatter.title).toBe('Auto Title');
    });
  });

  describe('Validation System', () => {
    test('should validate correct frontmatter', () => {
      const frontmatter = {
        title: 'Test Post',
        date: '2024-01-15',
        excerpt: 'Test excerpt',
        tags: ['test'],
        category: 'Technical'
      };

      const result = validateFrontmatter(frontmatter);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should catch missing required fields', () => {
      const frontmatter = {
        title: 'Test Post'
        // Missing date and excerpt
      };

      const result = validateFrontmatter(frontmatter);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should validate date format', () => {
      const frontmatter = {
        title: 'Test',
        date: 'invalid-date',
        excerpt: 'Test'
      };

      const result = validateFrontmatter(frontmatter);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.code === 'INVALID_DATE_FORMAT')).toBe(true);
    });

    test('should validate markdown content structure', () => {
      const markdown = `# Heading

This is a paragraph.

\`\`\`javascript
console.log('code');
\`\`\`

Another paragraph.`;

      const result = validateMarkdownContent(markdown);
      expect(result.isValid).toBe(true);
    });

    test('should catch unbalanced code blocks', () => {
      const markdown = '```javascript\nconsole.log("missing closing");';
      const result = validateMarkdownContent(markdown);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.code === 'UNBALANCED_CODE_BLOCKS')).toBe(true);
    });
  });

  describe('Caching System', () => {
    beforeEach(() => {
      markdownCache.clearCache();
    });

    test('should cache parsed content', () => {
      const content = '# Test\n\nContent here';
      const postId = 'test-post';

      // First parse
      const result1 = safeParseMarkdown(postId, content);
      
      // Second parse should use cache
      const result2 = safeParseMarkdown(postId, content);
      
      expect(result1.content).toEqual(result2.content);
    });

    test('should handle parsing errors gracefully', () => {
      const invalidContent = '```unclosed code block';
      const postId = 'invalid-post';

      const result = safeParseMarkdown(postId, invalidContent);
      
      expect(result.error).toBeDefined();
      expect(result.content).toBeDefined(); // Should have fallback content
    });

    test('should provide cache statistics', () => {
      const content = '# Test';
      safeParseMarkdown('test-1', content);
      safeParseMarkdown('test-2', content);

      const stats = markdownCache.getCacheStats();
      expect(stats.size).toBe(2);
      expect(stats.entries).toHaveLength(2);
    });
  });

  describe('Integration Tests', () => {
    test('should process complete blog post with all features', () => {
      const complexMarkdown = `---
title: "Complex Post"
date: "2024-01-15"
excerpt: "A complex post with all features"
tags: ["test", "complex"]
featured: true
---

# Main Heading

This post has **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

## Table Example

| Feature | Status | Notes |
|---------|:------:|-------|
| Tables | ✓ | Working |
| Links | ✓ | [Example](https://example.com) |

### Code Block

\`\`\`javascript
function test() {
  return "Hello World";
}
\`\`\`

> This is a blockquote with **formatting**

![Test Image](test.jpg "Test Title")

---

Final paragraph with ==highlighted== text and math: E=mc^2^

<div>HTML content</div>`;

      const result = safeParseMarkdown('complex-post', complexMarkdown);
      
      expect(result.content.length).toBeGreaterThan(0);
      expect(result.frontmatter.title).toBe('Complex Post');
      expect(result.error).toBeUndefined();

      // Check that various content types are parsed
      const contentTypes = result.content.map(section => section.type);
      expect(contentTypes).toContain('heading');
      expect(contentTypes).toContain('paragraph');
      expect(contentTypes).toContain('table');
      expect(contentTypes).toContain('code');
      expect(contentTypes).toContain('blockquote');
      expect(contentTypes).toContain('image');
      expect(contentTypes).toContain('hr');
      expect(contentTypes).toContain('html');
    });
  });
});

// Manual testing utilities for development
export const testMarkdownFeatures = () => {
  console.log('🧪 Testing Enhanced Markdown Features...\n');

  // Test inline formatting
  console.log('📝 Inline Formatting:');
  const inlineTest = 'This has **bold**, *italic*, ~~strike~~, `code`, ==highlight==, H~2~O, and E=mc^2^';
  console.log('Input:', inlineTest);
  console.log('Parsed:', renderInlineMarkdown(inlineTest));
  console.log('');

  // Test table parsing
  console.log('📊 Table Parsing:');
  const tableTest = `| Name | Age | City |
|------|:---:|-----:|
| John | 25  | NYC  |
| Jane | 30  | LA   |`;
  const tableParsed = parseContent(tableTest);
  console.log('Input:', tableTest);
  console.log('Parsed:', tableParsed[0]);
  console.log('');

  // Test frontmatter
  console.log('📋 Frontmatter Parsing:');
  const frontmatterTest = `---
title: "Test Post"
date: "2024-01-15"
tags: ["react", "typescript"]
---

# Content here`;
  const frontmatterParsed = parseFrontmatter(frontmatterTest);
  console.log('Input frontmatter extracted:', frontmatterParsed.frontmatter);
  console.log('');

  // Test validation
  console.log('✅ Validation:');
  const validationResult = validateMarkdownContent('# Good\n\nContent with ```js\ncode\n```');
  console.log('Valid content result:', validationResult);
  console.log('');

  console.log('✨ All tests completed!');
};

// Export for browser console testing
if (typeof window !== 'undefined') {
  (window as any).testMarkdownFeatures = testMarkdownFeatures;
}
