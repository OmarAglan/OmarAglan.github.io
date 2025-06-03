import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogSearchEngine, SearchResult } from '../../utils/searchEngine';
import { BlogPost } from '../../types/index';
import './EnhancedSearch.css';

interface EnhancedSearchProps {
  posts: BlogPost[];
  placeholder?: string;
  maxResults?: number;
  showSuggestions?: boolean;
  className?: string;
}

export function EnhancedSearch({
  posts,
  placeholder = 'Search articles...',
  maxResults = 8,
  showSuggestions = true,
  className = ''
}: EnhancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Initialize search engine
  const searchEngine = useMemo(() => new BlogSearchEngine(posts), [posts]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blog-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) return;

    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('blog-recent-searches', JSON.stringify(updated));
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        
        const searchResults = searchEngine.search(query, {
          includeContent: true,
          maxResults
        });
        
        setResults(searchResults);
        
        if (showSuggestions) {
          const searchSuggestions = searchEngine.getSuggestions(query);
          setSuggestions(searchSuggestions);
        }
        
        setIsLoading(false);
        setSelectedIndex(-1);
      } else {
        setResults([]);
        setSuggestions([]);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchEngine, maxResults, showSuggestions]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = results.length + suggestions.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (totalItems + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex === -1) {
          // Direct search
          if (query.trim()) {
            saveRecentSearch(query);
            handleSearch(query);
          }
        } else if (selectedIndex < results.length) {
          // Navigate to selected result
          const selectedResult = results[selectedIndex];
          saveRecentSearch(query);
          setIsOpen(false);
          // Navigation will be handled by Link component
        } else {
          // Use selected suggestion
          const suggestionIndex = selectedIndex - results.length;
          const selectedSuggestion = suggestions[suggestionIndex];
          if (selectedSuggestion) {
            setQuery(selectedSuggestion);
            inputRef.current?.focus();
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setIsOpen(false);
      // In a real app, you might navigate to a search results page
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    saveRecentSearch(query);
    setIsOpen(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('blog-recent-searches');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const highlightedResults = results.map((result, index) => ({
    ...result,
    isSelected: index === selectedIndex
  }));

  const highlightedSuggestions = suggestions.map((suggestion, index) => ({
    text: suggestion,
    isSelected: (results.length + index) === selectedIndex
  }));

  return (
    <div className={`enhanced-search ${className}`} ref={searchRef}>
      <div className="search-input-container">
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="Search articles"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
        
        {query && (
          <button
            className="clear-button"
            onClick={() => {
              setQuery('');
              setResults([]);
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
        
        {isLoading && (
          <div className="loading-spinner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="search-dropdown"
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="search-section">
                <div className="section-header">
                  <span>Recent Searches</span>
                  <button 
                    onClick={clearRecentSearches}
                    className="clear-recent"
                    aria-label="Clear recent searches"
                  >
                    Clear
                  </button>
                </div>
                <div className="recent-searches">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="recent-search-item"
                      onClick={() => {
                        setQuery(search);
                        inputRef.current?.focus();
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3"/>
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="search-section">
                <div className="section-header">
                  <span>Articles ({results.length})</span>
                </div>
                <div className="search-results">
                  {highlightedResults.map((result, index) => (
                    <Link
                      key={result.id}
                      to={`/blog/${result.id}`}
                      className={`search-result-item ${result.isSelected ? 'selected' : ''}`}
                      onClick={handleResultClick}
                    >
                      <div className="result-content">
                        <div className="result-header">
                          <h4 
                            className="result-title"
                            dangerouslySetInnerHTML={{ __html: result.highlights.title || result.title }}
                          />
                          <span className="result-category">{result.category}</span>
                        </div>
                        <p 
                          className="result-excerpt"
                          dangerouslySetInnerHTML={{ 
                            __html: result.highlights.excerpt || result.excerpt 
                          }}
                        />
                        <div className="result-meta">
                          <span className="result-date">{formatDate(result.date)}</span>
                          <span className="result-read-time">{result.readTime}</span>
                          <div className="result-tags">
                            {result.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="result-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="result-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9,18 15,12 9,6"/>
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && showSuggestions && (
              <div className="search-section">
                <div className="section-header">
                  <span>Suggestions</span>
                </div>
                <div className="search-suggestions">
                  {highlightedSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className={`suggestion-item ${suggestion.isSelected ? 'selected' : ''}`}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query && !isLoading && results.length === 0 && (
              <div className="no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h4>No articles found</h4>
                <p>Try adjusting your search terms or browse by category</p>
              </div>
            )}

            {/* Popular Searches */}
            {!query && recentSearches.length === 0 && (
              <div className="search-section">
                <div className="section-header">
                  <span>Popular Topics</span>
                </div>
                <div className="popular-searches">
                  {searchEngine.getPopularSearchTerms().slice(0, 6).map((term, index) => (
                    <button
                      key={index}
                      className="popular-search-item"
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact search for mobile
export function CompactSearch({ posts, onResultClick }: { 
  posts: BlogPost[]; 
  onResultClick?: () => void; 
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const searchEngine = useMemo(() => new BlogSearchEngine(posts), [posts]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        const searchResults = searchEngine.search(query, { maxResults: 5 });
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchEngine]);

  return (
    <div className="compact-search">
      <div className="compact-search-input">
        <input
          type="text"
          placeholder="Quick search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="compact-results">
          {results.map((result) => (
            <Link
              key={result.id}
              to={`/blog/${result.id}`}
              className="compact-result-item"
              onClick={onResultClick}
            >
              <span className="compact-title">{result.title}</span>
              <span className="compact-category">{result.category}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
