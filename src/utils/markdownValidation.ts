// src/utils/markdownValidation.ts
// Validation and error handling for markdown content

import type { BlogPost } from '../types/index';
import type { ParsedSection } from './contentParser';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'error';
  code: string;
  message: string;
  line?: number;
  column?: number;
}

export interface ValidationWarning {
  type: 'warning';
  code: string;
  message: string;
  line?: number;
  column?: number;
  suggestion?: string;
}

// Validate frontmatter structure
export const validateFrontmatter = (frontmatter: any): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Required fields
  const requiredFields = ['title', 'date', 'excerpt'];
  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      errors.push({
        type: 'error',
        code: 'MISSING_REQUIRED_FIELD',
        message: `Missing required field: ${field}`
      });
    }
  });

  // Validate date format
  if (frontmatter.date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(frontmatter.date)) {
      errors.push({
        type: 'error',
        code: 'INVALID_DATE_FORMAT',
        message: 'Date must be in YYYY-MM-DD format'
      });
    }
  }

  // Validate tags
  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    errors.push({
      type: 'error',
      code: 'INVALID_TAGS_FORMAT',
      message: 'Tags must be an array'
    });
  }

  // Validate readTime format
  if (frontmatter.readTime && typeof frontmatter.readTime === 'string') {
    const readTimeRegex = /^\d+\s+(min|mins|minute|minutes)\s+read$/i;
    if (!readTimeRegex.test(frontmatter.readTime)) {
      warnings.push({
        type: 'warning',
        code: 'INVALID_READ_TIME_FORMAT',
        message: 'readTime should follow format: "X min read"',
        suggestion: 'Example: "5 min read"'
      });
    }
  }

  // Check for recommended fields
  const recommendedFields = ['category', 'tags', 'readTime'];
  recommendedFields.forEach(field => {
    if (!frontmatter[field]) {
      warnings.push({
        type: 'warning',
        code: 'MISSING_RECOMMENDED_FIELD',
        message: `Missing recommended field: ${field}`,
        suggestion: `Consider adding ${field} for better categorization`
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Validate markdown content structure
export const validateMarkdownContent = (content: string): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const lines = content.split('\n');

  // Check for at least one heading
  const hasHeading = lines.some(line => /^#{1,6}\s/.test(line));
  if (!hasHeading) {
    warnings.push({
      type: 'warning',
      code: 'NO_HEADINGS',
      message: 'Content has no headings',
      suggestion: 'Add headings to improve structure and navigation'
    });
  }

  // Check for very long paragraphs
  lines.forEach((line, index) => {
    if (line.length > 200 && !line.startsWith('#') && !line.startsWith('```')) {
      warnings.push({
        type: 'warning',
        code: 'LONG_PARAGRAPH',
        message: 'Very long paragraph detected',
        line: index + 1,
        suggestion: 'Consider breaking long paragraphs into smaller ones'
      });
    }
  });

  // Check for unbalanced code blocks
  const codeBlockStarts = lines.filter(line => line.startsWith('```')).length;
  if (codeBlockStarts % 2 !== 0) {
    errors.push({
      type: 'error',
      code: 'UNBALANCED_CODE_BLOCKS',
      message: 'Unbalanced code blocks (missing opening or closing ```)'
    });
  }

  // Check for broken links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  lines.forEach((line, index) => {
    let match;
    while ((match = linkRegex.exec(line)) !== null) {
      const [, linkText, url] = match;
      
      // Check for empty link text or URL
      if (!linkText.trim()) {
        warnings.push({
          type: 'warning',
          code: 'EMPTY_LINK_TEXT',
          message: 'Link with empty text',
          line: index + 1
        });
      }
      
      if (!url.trim()) {
        errors.push({
          type: 'error',
          code: 'EMPTY_LINK_URL',
          message: 'Link with empty URL',
          line: index + 1
        });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Validate parsed sections
export const validateParsedSections = (sections: ParsedSection[]): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check for empty content
  if (sections.length === 0) {
    errors.push({
      type: 'error',
      code: 'EMPTY_CONTENT',
      message: 'No content sections found'
    });
    return { isValid: false, errors, warnings };
  }

  // Validate table structure
  sections.forEach((section, index) => {
    if (section.type === 'table') {
      const rows = section.content;
      if (rows.length < 2) {
        warnings.push({
          type: 'warning',
          code: 'SMALL_TABLE',
          message: `Table at section ${index + 1} has fewer than 2 rows`,
          suggestion: 'Consider if a table is necessary for such small data'
        });
      }

      // Check for consistent column count
      const columnCounts = rows.map(row => row.split('|').length);
      const uniqueCounts = [...new Set(columnCounts)];
      if (uniqueCounts.length > 1) {
        errors.push({
          type: 'error',
          code: 'INCONSISTENT_TABLE_COLUMNS',
          message: `Table at section ${index + 1} has inconsistent column counts`
        });
      }
    }

    // Validate image sections
    if (section.type === 'image') {
      if (!section.meta?.src) {
        errors.push({
          type: 'error',
          code: 'MISSING_IMAGE_SRC',
          message: `Image at section ${index + 1} is missing src attribute`
        });
      }

      if (!section.meta?.alt) {
        warnings.push({
          type: 'warning',
          code: 'MISSING_IMAGE_ALT',
          message: `Image at section ${index + 1} is missing alt text`,
          suggestion: 'Add alt text for accessibility'
        });
      }
    }

    // Validate code blocks
    if (section.type === 'code') {
      if (section.content.join('').trim().length === 0) {
        warnings.push({
          type: 'warning',
          code: 'EMPTY_CODE_BLOCK',
          message: `Empty code block at section ${index + 1}`,
          suggestion: 'Remove empty code blocks or add content'
        });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Complete validation for a blog post
export const validateBlogPost = (post: BlogPost): ValidationResult => {
  const allErrors: ValidationError[] = [];
  const allWarnings: ValidationWarning[] = [];

  // Validate basic post structure
  if (!post.id || !post.title || !post.content) {
    allErrors.push({
      type: 'error',
      code: 'MISSING_REQUIRED_POST_FIELDS',
      message: 'Blog post is missing required fields (id, title, or content)'
    });
  }

  // Only validate content if the post structure is valid
  if (post.content) {
    try {
      // Extract frontmatter and content
      const frontmatterMatch = post.content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (frontmatterMatch) {
        const [, frontmatterStr, markdownContent] = frontmatterMatch;
        
        // Parse and validate frontmatter
        try {
          const frontmatter = JSON.parse(frontmatterStr.replace(/(\w+):\s*(.*)/g, '"$1": "$2"'));
          const frontmatterValidation = validateFrontmatter(frontmatter);
          allErrors.push(...frontmatterValidation.errors);
          allWarnings.push(...frontmatterValidation.warnings);
        } catch (error) {
          allErrors.push({
            type: 'error',
            code: 'INVALID_FRONTMATTER',
            message: 'Failed to parse frontmatter YAML'
          });
        }

        // Validate markdown content
        const contentValidation = validateMarkdownContent(markdownContent);
        allErrors.push(...contentValidation.errors);
        allWarnings.push(...contentValidation.warnings);
      } else {
        allWarnings.push({
          type: 'warning',
          code: 'NO_FRONTMATTER',
          message: 'Post has no frontmatter section',
          suggestion: 'Add frontmatter for better metadata management'
        });
      }
    } catch (error) {
      allErrors.push({
        type: 'error',
        code: 'CONTENT_PARSING_ERROR',
        message: 'Failed to parse post content'
      });
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
};

// Utility to format validation results for display
export const formatValidationResults = (result: ValidationResult): string => {
  const lines: string[] = [];
  
  if (result.isValid) {
    lines.push('✅ Validation passed');
  } else {
    lines.push('❌ Validation failed');
  }

  if (result.errors.length > 0) {
    lines.push('\n🔴 Errors:');
    result.errors.forEach(error => {
      const location = error.line ? ` (line ${error.line}${error.column ? `:${error.column}` : ''})` : '';
      lines.push(`  - ${error.message}${location}`);
    });
  }

  if (result.warnings.length > 0) {
    lines.push('\n🟡 Warnings:');
    result.warnings.forEach(warning => {
      const location = warning.line ? ` (line ${warning.line}${warning.column ? `:${warning.column}` : ''})` : '';
      const suggestion = warning.suggestion ? `\n    💡 ${warning.suggestion}` : '';
      lines.push(`  - ${warning.message}${location}${suggestion}`);
    });
  }

  return lines.join('\n');
};
