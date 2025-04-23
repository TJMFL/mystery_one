import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message } from '../types';
import { Building } from 'lucide-react';
import { getChatResponse } from '../lib/googleAI';

interface ChatContainerProps {
  guestName?: string;
  propertyName?: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  guestName = 'Guest',
  propertyName = 'Chicago Property',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      guestId: '123',
      role: 'assistant',
      content: `Welcome to Chicago ${guestName}! I'm your virtual concierge and local guide for your stay at ${propertyName}. I can help you discover the best of Chicago, from iconic attractions to hidden gems. I can also help you find current events, and activities happening during your stay. Ask me about restaurants, museums, events, transportation, or anything else you'd like to know about the Windy City!`,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      guestId: '123',
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await getChatResponse(content, '123');

      const assistantMessage: Message = {
        id: Date.now().toString(),
        guestId: '123',
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);

      const errorMessage: Message = {
        id: Date.now().toString(),
        guestId: '123',
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Building className="h-6 w-6 text-blue-600 mr-2" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Chicago Concierge</h1>
              <p className="text-sm text-gray-500">
                {propertyName} • Welcome, {guestName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat message area with background image */}
      <div className="flex-1 overflow-y-auto p-4 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/chi-back-2.jpeg')] before:bg-cover before:bg-center before:opacity-20 before:z-0">
        <div className="relative z-10 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLastMessage={index === messages.length - 1}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-500">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
