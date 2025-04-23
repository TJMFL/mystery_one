import React from 'react';
import ChatContainer from '../components/ChatContainer';

const ChatPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-white">
      <ChatContainer 
        guestName="Brock"
        propertyName="Skylit Boho Retreat"
      />
    </div>
  );
};

export default ChatPage;