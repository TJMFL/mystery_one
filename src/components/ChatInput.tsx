import React, { useState } from 'react';
import { Send, Mic, MapPin, Calendar, Coffee } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const QUICK_SUGGESTIONS = [
  { icon: <Coffee className="w-4 h-4 mr-1" />, text: "Where to eat?" },
  { icon: <Calendar className="w-4 h-4 mr-1" />, text: "What's happening today?" },
  { icon: <MapPin className="w-4 h-4 mr-1" />, text: "How do I get to Navy Pier?" },
];

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      onSendMessage(suggestion);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {showSuggestions && (
        <div className="mb-3 flex flex-wrap gap-2">
          {QUICK_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.text)}
              className="flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {suggestion.icon}
              {suggestion.text}
            </button>
          ))}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <textarea
            className="w-full rounded-2xl border border-gray-300 pl-4 pr-10 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none disabled:opacity-50"
            placeholder="Ask me anything about Chicago..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 hover:text-red-700 disabled:opacity-50"
            disabled={!message.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <button 
          className="rounded-full bg-red-100 p-3 text-red-600 hover:bg-green-200 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <Mic className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;