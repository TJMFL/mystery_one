import React from 'react';
import { Message } from '../types';
import { MapPin, Calendar, Utensils, Car, Info } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastMessage = false }) => {
  const isUser = message.role === 'user';
  const isAgent = message.role === 'assistant';

  // Function to render different content types
  const renderContent = () => {
    // Check if content might contain a special component
    if (isAgent && message.content.includes('{{') && message.content.includes('}}')) {
      // This is a simplified approach. In a real app, you'd use proper parsing or structured data
      if (message.content.includes('{{event}}')) {
        return (
          <div className="mt-2 bg-blue-50 p-3 rounded-md border border-blue-100">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Chicago Jazz Festival</h4>
                <p className="text-sm text-gray-600">Millennium Park, Aug 26-28</p>
                <p className="text-xs text-gray-500 mt-1">Free admission • Family-friendly</p>
                <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                  Get Tickets
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      if (message.content.includes('{{restaurant}}')) {
        return (
          <div className="mt-2 bg-blue-50 p-3 rounded-md border border-blue-100">
            <div className="flex items-start">
              <Utensils className="h-5 w-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">The Purple Pig</h4>
                <p className="text-sm text-gray-600">Mediterranean • $$$ • Magnificent Mile</p>
                <p className="text-xs text-gray-500 mt-1">Reservations available tonight at 7:30pm</p>
                <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                  Reserve a Table
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      if (message.content.includes('{{transport}}')) {
        return (
          <div className="mt-2 bg-blue-50 p-3 rounded-md border border-blue-100">
            <div className="flex items-start">
              <Car className="h-5 w-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Transportation Options</h4>
                <p className="text-sm text-gray-600">To: Wrigley Field (4.2 miles)</p>
                <div className="mt-1 space-y-1">
                  <p className="text-xs">
                    <span className="font-medium">Lyft:</span> ~$15 (15 mins)
                  </p>
                  <p className="text-xs">
                    <span className="font-medium">CTA Red Line:</span> $2.50 (25 mins)
                  </p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button className="text-xs bg-pink-600 text-white px-3 py-1 rounded-md hover:bg-pink-700 transition-colors">
                    Lyft
                  </button>
                  <button className="text-xs bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">
                    CTA Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      if (message.content.includes('{{secret}}')) {
        return (
          <div className="mt-2 bg-amber-50 p-3 rounded-md border border-amber-100">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-amber-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800">Local Secret</h4>
                <p className="text-sm text-gray-700">The Green Mill has a secret underground tunnel from Prohibition days. Ask the bartender about it!</p>
                <p className="text-xs text-gray-500 italic mt-1">Uptown • Jazz Clubs • History</p>
              </div>
            </div>
          </div>
        );
      }
    }
    
    // Default: render as regular text
    return <p>{message.content}</p>;
  };

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4 ${isLastMessage ? 'animate-fadeIn' : ''}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : isAgent
            ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
            : 'bg-gray-100 text-gray-500 text-sm italic'
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatMessage;