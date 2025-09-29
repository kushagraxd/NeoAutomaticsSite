import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { Input } from '../client/src/components/ui/input';
import { Card, CardContent } from '../client/src/components/ui/card';
import { Badge } from '../client/src/components/ui/badge';
import { Button } from '../client/src/components/ui/button';
import { cn } from '../client/src/lib/utils';
import { useMutation } from '@tanstack/react-query';

interface SearchResult {
  product: string;
  description: string;
  score: number;
}

interface SearchResponse {
  results: SearchResult[];
}

interface SemanticSearchProps {
  onProductSelect?: (product: string) => void;
  onQuoteRequest?: (product: string) => void;
  placeholder?: string;
  className?: string;
}

export function SemanticSearch({ 
  onProductSelect, 
  onQuoteRequest, 
  placeholder = "Search for precision components...",
  className 
}: SemanticSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchMutation = useMutation({
    mutationFn: async (q: string) => {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Search failed');
      }
      
      return response.json() as Promise<SearchResponse>;
    },
    onSuccess: (data) => {
      setResults(data.results);
      setShowResults(true);
      setSelectedIndex(-1);
    },
    onError: (error) => {
      console.error('Search error:', error);
      setResults([]);
      setShowResults(false);
    }
  });

  // Debounced search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.trim().length >= 2) {
      timeoutRef.current = setTimeout(() => {
        searchMutation.mutate(query);
      }, 300);
    } else {
      setResults([]);
      setShowResults(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleProductSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleProductSelect = (result: SearchResult) => {
    setQuery(result.product);
    setShowResults(false);
    setSelectedIndex(-1);
    onProductSelect?.(result.product);
  };

  const handleQuoteClick = (e: React.MouseEvent, product: string) => {
    e.stopPropagation();
    setShowResults(false);
    onQuoteRequest?.(product);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getScoreColor = (score: number) => {
    if (score > 0.8) return 'text-green-600';
    if (score > 0.6) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getScoreLabel = (score: number) => {
    if (score > 0.8) return 'Excellent match';
    if (score > 0.6) return 'Good match';
    return 'Possible match';
  };

  return (
    <div ref={searchRef} className={cn("relative", className)} data-testid="semantic-search">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <Search className="w-4 h-4 text-text-muted" />
          <Badge variant="secondary" className="bg-accent-primary/10 text-accent-primary text-xs">
            AI
          </Badge>
        </div>
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) {
              setShowResults(true);
            }
          }}
          placeholder={placeholder}
          className="pl-16 pr-10"
          data-testid="input-semantic-search"
        />
        {searchMutation.isPending && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-accent-primary" />
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-bg-elevated border-border shadow-lg max-h-80 overflow-hidden">
          <CardContent className="p-0">
            {results.length === 0 ? (
              <div className="p-4 text-center text-text-muted">
                <Search className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No products found for "{query}"</p>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-80" data-testid="search-results">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-4 cursor-pointer border-b border-border last:border-b-0 transition-colors",
                      index === selectedIndex
                        ? "bg-accent-primary/10"
                        : "hover:bg-bg-base"
                    )}
                    onClick={() => handleProductSelect(result)}
                    data-testid={`search-result-${index}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-text-primary truncate">
                          {result.product}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <div className={cn("w-2 h-2 rounded-full", {
                            'bg-green-500': result.score > 0.8,
                            'bg-yellow-500': result.score > 0.6 && result.score <= 0.8,
                            'bg-gray-400': result.score <= 0.6,
                          })} />
                          <span className={cn("text-xs", getScoreColor(result.score))}>
                            {getScoreLabel(result.score)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-text-muted truncate">
                        {result.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {onQuoteRequest && (
                        <Button
                          onClick={(e) => handleQuoteClick(e, result.product)}
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 border-accent-primary text-accent-primary hover:bg-accent-primary/10"
                          data-testid={`button-quote-${index}`}
                        >
                          Quote
                        </Button>
                      )}
                      <ArrowRight className="w-4 h-4 text-text-muted" />
                    </div>
                  </div>
                ))}
                
                {results.length > 0 && (
                  <div className="p-3 bg-bg-base border-t border-border">
                    <div className="flex items-center justify-center space-x-2 text-xs text-text-muted">
                      <Sparkles className="w-3 h-3 text-accent-primary" />
                      <span>Powered by AI semantic search</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}