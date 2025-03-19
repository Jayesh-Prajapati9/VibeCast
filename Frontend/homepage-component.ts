// src/components/HomePage.tsx - Home Page Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateRoomModal from './CreateRoomModal';

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showJoinForm, setShowJoinForm] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');
  const [generatedRoomId, setGeneratedRoomId] = useState<string>('');
  const navigate = useNavigate();

  const handleCreateRoom = (): void => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedRoomId(newRoomId);
    setShowModal(true);
  };

  const handleJoinRoom = (): void => {
    setShowJoinForm(!showJoinForm);
  };

  const handleJoinSubmit = (): void => {
    if (roomId.trim()) {
      navigate(`/chat/${roomId}`);
    }
  };

  const handleEnterRoom = (): void => {
    navigate(`/chat/${generatedRoomId}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome to ChatApp</h1>
        <div className="flex flex-col space-y-4">
          <button 
            className="py-4 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all"
            onClick={handleCreateRoom}
          >
            Create a Room
          </button>
          <button 
            className="py-4 px-4 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transform hover:-translate-y-0.5 transition-all"
            onClick={handleJoinRoom}
          >
            Join a Room
          </button>
        </div>
        
        {showJoinForm && (
          <div className="mt-6 flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Enter Room ID" 
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              className="py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              onClick={handleJoinSubmit}
            >
              Join
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <CreateRoomModal 
          roomId={generatedRoomId} 
          onClose={() => setShowModal(false)}
          onEnterRoom={handleEnterRoom}
        />
      )}
    </div>
  );
};

export default HomePage;
