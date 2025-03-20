// src/components/Message.tsx - Message Component
import React from 'react';
import { MessageProps } from '../types';

const Message: React.FC<MessageProps> = ({ message }) => {
  if (message.isSystem) {
    return (
      <div className="text-center italic text-gray-500 py-2">
        {message.text}
      </div>
    );
  }

  return (
    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
      message.isSelf 
        ? 'bg-blue-600 text-white self-end rounded-br-sm' 
        : 'bg-gray-100 text-gray-800 self-start rounded-bl-sm'
    }`}>
      {!message.isSelf && (
        <div className="text-xs opacity-70 mb-1">
          {message.sender}
        </div>
      )}
      <div className="leading-relaxed break-words">
        {message.text}
      </div>
    </div>
  );
};

export default Message;
