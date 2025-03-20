// src/components/ChatPage.tsx - Chat Page Component
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Message from './Message';
import { MessageData } from '../types';

const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Demo users for simulating responses
  const demoUsers: string[] = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey'];

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoinChat = (): void => {
    if (username.trim()) {
      setIsJoined(true);
      
      // Add system message that user has joined
      addMessage({
        text: `${username} joined the chat`,
        isSystem: true
      });
      
      // Add demo welcome message
      setTimeout(() => {
        const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        addMessage({
          sender: randomUser,
          text: `Hey ${username}! Welcome to the chat room.`,
          time: new Date()
        });
      }, 1000);
    }
  };

  const handleSendMessage = (): void => {
    if (messageInput.trim()) {
      addMessage({
        sender: username,
        text: messageInput,
        time: new Date(),
        isSelf: true
      });
      setMessageInput('');
      
      // Simulate a response for demo purposes
      setTimeout(() => {
        const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const responses = [
          "That's interesting!",
          "I agree with you.",
          "Tell me more about that.",
          "Thanks for sharing!",
          "Great point!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        addMessage({
          sender: randomUser,
          text: randomResponse,
          time: new Date()
        });
      }, 1500);
    }
  };

  const addMessage = (messageData: MessageData): void => {
    setMessages(prevMessages => [...prevMessages, messageData]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-600 text-white px-4 py-4 flex justify-between items-center">
        <button 
          className="bg-transparent border-none text-white cursor-pointer flex items-center gap-2 text-sm"
          onClick={() => navigate('/')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-left"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-lg">Chat Room</h2>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
            {roomId}
          </span>
        </div>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {!isJoined ? (
        <div className="text-center bg-white p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoinChat()}
            className="px-4 py-3 border border-gray-300 rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleJoinChat}
            className="px-4 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Join Chat
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-white border-t border-gray-200">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 text-white rounded-full w-12 h-12 flex justify-center items-center hover:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
