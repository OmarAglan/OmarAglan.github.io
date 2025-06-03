// src/utils/mathRenderer.tsx
// Math and LaTeX rendering support for technical blog posts

import React, { useEffect, useRef } from 'react';

// Types for math content
export interface MathProps {
  children: string;
  display?: boolean; // true for block math, false for inline
  className?: string;
}

// Math component that can work with or without external libraries
export const Math: React.FC<MathProps> = ({ 
  children, 
  display = false, 
  className = '' 
}) => {
  const mathRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if MathJax is available
    if (typeof window !== 'undefined' && (window as any).MathJax) {
      const MathJax = (window as any).MathJax;
      if (mathRef.current) {
        MathJax.typesetPromise([mathRef.current]).catch((err: any) => {
          console.warn('MathJax typeset failed:', err);
        });
      }
    }
    // Check if KaTeX is available
    else if (typeof window !== 'undefined' && (window as any).katex) {
      const katex = (window as any).katex;
      if (mathRef.current) {
        try {
          katex.render(children, mathRef.current, {
            displayMode: display,
            throwOnError: false
          });
        } catch (err) {
          console.warn('KaTeX render failed:', err);
          // Fallback to plain text
          if (mathRef.current) {
            mathRef.current.textContent = children;
          }
        }
      }
    }
  }, [children, display]);

  // Fallback rendering without external libraries
  const fallbackContent = display ? (
    <div className={`math-block ${className}`}>
      <code>{children}</code>
    </div>
  ) : (
    <code className={`math-inline ${className}`}>{children}</code>
  );

  return display ? (
    <div 
      ref={mathRef as React.RefObject<HTMLDivElement>}
      className={`math-display ${className}`}
    >
      {fallbackContent}
    </div>
  ) : (
    <span 
      ref={mathRef as React.RefObject<HTMLSpanElement>}
      className={`math-inline ${className}`}
    >
      {fallbackContent}
    </span>
  );
};

// Enhanced content parser that recognizes math expressions
export const parseMathExpressions = (text: string): React.ReactNode => {
  // LaTeX-style math: $inline$ and $$display$$
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  
  // Match display math first ($$...$$)
  const displayMathRegex = /\$\$([^$]+)\$\$/g;
  let match;
  
  while ((match = displayMathRegex.exec(text)) !== null) {
    // Add text before the math
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // Add the math component
    parts.push(
      <Math key={`display-${match.index}`} display={true}>
        {match[1].trim()}
      </Math>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  // Now process inline math in the text parts
  const finalParts: (string | React.ReactNode)[] = [];
  parts.forEach((part, partIndex) => {
    if (typeof part === 'string') {
      const inlineMathRegex = /\$([^$]+)\$/g;
      let textParts: (string | React.ReactNode)[] = [];
      let lastTextIndex = 0;
      let inlineMatch;
      
      while ((inlineMatch = inlineMathRegex.exec(part)) !== null) {
        // Add text before the math
        if (inlineMatch.index > lastTextIndex) {
          textParts.push(part.slice(lastTextIndex, inlineMatch.index));
        }
        
        // Add the inline math component
        textParts.push(
          <Math key={`inline-${partIndex}-${inlineMatch.index}`} display={false}>
            {inlineMatch[1].trim()}
          </Math>
        );
        
        lastTextIndex = inlineMatch.index + inlineMatch[0].length;
      }
      
      // Add remaining text
      if (lastTextIndex < part.length) {
        textParts.push(part.slice(lastTextIndex));
      }
      
      finalParts.push(...textParts);
    } else {
      finalParts.push(part);
    }
  });
  
  return finalParts.length === 1 ? finalParts[0] : <>{finalParts}</>;
};

// Common math expressions and symbols
export const mathSymbols = {
  // Greek letters
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε',
  zeta: 'ζ', eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ',
  lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', omicron: 'ο',
  pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ',
  phi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
  
  // Uppercase Greek
  Alpha: 'Α', Beta: 'Β', Gamma: 'Γ', Delta: 'Δ', Epsilon: 'Ε',
  Zeta: 'Ζ', Eta: 'Η', Theta: 'Θ', Iota: 'Ι', Kappa: 'Κ',
  Lambda: 'Λ', Mu: 'Μ', Nu: 'Ν', Xi: 'Ξ', Omicron: 'Ο',
  Pi: 'Π', Rho: 'Ρ', Sigma: 'Σ', Tau: 'Τ', Upsilon: 'Υ',
  Phi: 'Φ', Chi: 'Χ', Psi: 'Ψ', Omega: 'Ω',
  
  // Math symbols
  infinity: '∞', partial: '∂', nabla: '∇', integral: '∫',
  sum: '∑', product: '∏', sqrt: '√', pm: '±', mp: '∓',
  times: '×', div: '÷', ne: '≠', le: '≤', ge: '≥',
  ll: '≪', gg: '≫', sim: '∼', approx: '≈', equiv: '≡',
  in: '∈', notin: '∉', subset: '⊂', supset: '⊃',
  cap: '∩', cup: '∪', and: '∧', or: '∨', not: '¬',
  implies: '⇒', iff: '⇔', forall: '∀', exists: '∃'
};

// Simple math expression replacer for basic use without external libraries
export const replaceSimpleMath = (text: string): string => {
  let result = text;
  
  // Replace common math symbols
  Object.entries(mathSymbols).forEach(([name, symbol]) => {
    const regex = new RegExp(`\\\\${name}\\b`, 'g');
    result = result.replace(regex, symbol);
  });
  
  // Replace some common patterns
  result = result.replace(/\\\(/g, '('); // \( -> (
  result = result.replace(/\\\)/g, ')'); // \) -> )
  result = result.replace(/\\\[/g, '['); // \[ -> [
  result = result.replace(/\\\]/g, ']'); // \] -> ]
  result = result.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)'); // \frac{a}{b} -> (a)/(b)
  result = result.replace(/\^([^{}\s]+)/g, '<sup>$1</sup>'); // x^2 -> x²
  result = result.replace(/\^{([^}]+)}/g, '<sup>$1</sup>'); // x^{2+3} -> x^(2+3)
  result = result.replace(/_([^{}\s]+)/g, '<sub>$1</sub>'); // x_1 -> x₁
  result = result.replace(/_{([^}]+)}/g, '<sub>$1</sub>'); // x_{1+2} -> x_(1+2)
  
  return result;
};

// Load external math library (MathJax or KaTeX)
export const loadMathLibrary = async (library: 'mathjax' | 'katex' = 'mathjax'): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  try {
    if (library === 'mathjax') {
      // Load MathJax from CDN
      if (!(window as any).MathJax) {
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
        document.head.appendChild(script);
        
        await new Promise(resolve => {
          script.onload = resolve;
        });
        
        const mathJaxScript = document.createElement('script');
        mathJaxScript.id = 'MathJax-script';
        mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        
        // Configure MathJax
        (window as any).MathJax = {
          tex: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEscapes: true
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
          }
        };
        
        document.head.appendChild(mathJaxScript);
        
        return new Promise(resolve => {
          mathJaxScript.onload = () => resolve(true);
          mathJaxScript.onerror = () => resolve(false);
        });
      }
      return true;
    } else if (library === 'katex') {
      // Load KaTeX from CDN
      if (!(window as any).katex) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
        document.head.appendChild(link);
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
        document.head.appendChild(script);
        
        return new Promise(resolve => {
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
        });
      }
      return true;
    }
  } catch (error) {
    console.warn(`Failed to load ${library}:`, error);
    return false;
  }
  
  return false;
};

// CSS for math fallback styling
export const mathStyles = `
.math-display {
  display: block;
  text-align: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 4px solid #4ecdc4;
  font-family: 'Times New Roman', serif;
  font-size: 1.1em;
}

.math-inline {
  font-family: 'Times New Roman', serif;
  font-style: italic;
  padding: 0.1em 0.2em;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.math-block code,
.math-inline code {
  font-family: 'Times New Roman', serif;
  font-style: italic;
  background: transparent;
  padding: 0;
}

/* Enhanced styling for math expressions */
.math-display mjx-container,
.math-inline mjx-container {
  color: inherit !important;
}

.katex-display {
  margin: 1.5rem 0;
}

.katex {
  font-size: 1.1em;
}
`;

// Utility to inject math styles
export const injectMathStyles = (): void => {
  if (typeof document !== 'undefined') {
    const styleId = 'math-renderer-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = mathStyles;
      document.head.appendChild(style);
    }
  }
};
