import React, { useState, useEffect, useRef } from 'react';

function AdminChat({ user, setUsers }) {
  const [messages, setMessages] = useState([
    { text: "Hi Nancy, how are you?", fromMe: true },
    { text: "I'm good, how about you?", fromMe: false },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [...messages, { text: newMessage, fromMe: true }];
      setMessages(updatedMessages);

      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === user.id ? { ...u, lastMessage: `You: ${newMessage}` } : u
        )
      );

      setNewMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white" style={{ height: '100vh' }}>
      <div className="p-2 border-b border-gray-300">
        <h2 className="text-md font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500"></p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto" style={{ flexGrow: 1 }}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.fromMe ? 'text-right' : ''}`}>
            <div className="inline-block p-3 rounded-md shadow-lg custom-shadow">
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-300 flex items-center">
        <input 
          type="text" 
          className="flex-1 p-2 border rounded-lg mr-2" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={sendMessage} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AdminChat;
