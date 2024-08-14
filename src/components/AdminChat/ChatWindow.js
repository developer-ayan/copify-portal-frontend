import React, { useState } from 'react';

function ChatWindow({ user, updateUserMessage }) {
  const [messages, setMessages] = useState([
    { text: "Hi Nancy, how are you?", fromMe: true },
    { text: "I'm good, how about you?", fromMe: false },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [...messages, { text: newMessage, fromMe: true }];
      setMessages(updatedMessages);

      updateUserMessage(user.id, newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-2 border-b border-gray-300">
        <h2 className="text-md font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">last seen</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.fromMe ? 'text-right' : ''}`}>
            <div className={`inline-block p-3 rounded-md shadow-md ${message.fromMe ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-300 flex items-center">
        <input 
          type="text" 
          className="flex-1 p-2 border rounded-lg mr-2" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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

export default ChatWindow;
