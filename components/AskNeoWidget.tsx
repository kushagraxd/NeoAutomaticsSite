import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Zap, Loader2 } from 'lucide-react';
import { Button } from '../client/src/components/ui/button';
import { Input } from '../client/src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../client/src/components/ui/card';
import { cn } from '../client/src/lib/utils';
import { useMutation } from '@tanstack/react-query';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatResponse {
  reply: string;
  suggestions?: string[];
}

const QUICK_CHIPS = [
  "Lead time for 10k pcs?",
  "Do you do 20×9 bushes?", 
  "Heat treatment options?",
  "Typical tolerance?"
];

export function AskNeoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Neo AI, your precision manufacturing assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>(QUICK_CHIPS);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (data: { messages: { role: string; content: string }[] }) => {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }
      
      return response.json() as Promise<ChatResponse>;
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      }]);
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    },
    onError: (error) => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date()
      }]);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || chatMutation.isPending) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Prepare messages for API
    const apiMessages = [...messages, userMessage].map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    chatMutation.mutate({ messages: apiMessages });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChipClick = (chip: string) => {
    handleSendMessage(chip);
  };

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="ask-neo-widget">
      {/* Chat Panel */}
      {isOpen && (
        <Card 
          className={cn(
            "w-80 h-96 mb-4 bg-bg-elevated border-border shadow-xl",
            !prefersReducedMotion && "animate-in slide-in-from-bottom-2 duration-300"
          )}
          data-testid="ask-neo-panel"
        >
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-text-primary">Neo AI</CardTitle>
                  <div className="text-xs text-text-muted">Precision Manufacturing Assistant</div>
                </div>
                <div className="ml-auto px-2 py-1 bg-accent-primary/10 text-accent-primary text-xs font-medium rounded-full">
                  AI
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-accent-primary/10"
                data-testid="button-close-chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                  data-testid={`message-${message.role}-${index}`}
                >
                  <div
                    className={cn(
                      "max-w-[85%] p-3 rounded-lg text-sm",
                      message.role === 'user'
                        ? "bg-accent-primary text-bg-base"
                        : "bg-bg-base text-text-primary border border-border"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {chatMutation.isPending && (
                <div className="flex justify-start">
                  <div className="bg-bg-base text-text-primary border border-border p-3 rounded-lg flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Neo AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2 border-t border-border">
                <div className="flex flex-wrap gap-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleChipClick(suggestion)}
                      disabled={chatMutation.isPending}
                      className="text-xs px-2 py-1 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary rounded-full transition-colors disabled:opacity-50"
                      data-testid={`suggestion-chip-${index}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our capabilities..."
                  disabled={chatMutation.isPending}
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || chatMutation.isPending}
                  size="sm"
                  className="bg-accent-primary hover:bg-accent-primary/80 text-bg-base"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg bg-accent-primary hover:bg-accent-primary/80 text-bg-base relative",
          !prefersReducedMotion && "transition-all duration-300 hover:scale-105"
        )}
        data-testid="button-open-chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-primary border-2 border-bg-base rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-bg-base">AI</span>
            </div>
          </>
        )}
      </Button>
    </div>
  );
}