// src/components/CreateRoomModal.tsx - Modal Component for Room Creation
import React, { useState } from 'react';
import { CreateRoomModalProps } from '../types';

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ roomId, onClose, onEnterRoom }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyRoomId = (): void => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-11/12 max-w-md p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Room Created!</h2>
        <p className="text-gray-600 mb-2">Share this Room ID with others to invite them:</p>
        <div className="bg-gray-100 py-4 px-4 rounded-lg text-lg font-semibold text-gray-800 my-4">
          {roomId}
        </div>
        <button 
          className="text-blue-600 font-semibold flex items-center justify-center mx-auto transition-colors hover:text-blue-800"
          onClick={handleCopyRoomId}
        >
          {copied ? (
            'Copied!'
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
              Copy Room ID
            </>
          )}
        </button>
        <button 
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 mt-6"
          onClick={onEnterRoom}
        >
          Enter Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoomModal;
