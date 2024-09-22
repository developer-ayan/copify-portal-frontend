import React from 'react';

function Sidebar({ users, onUserSelect }) {
  return (
    <div className="h-full bg-white border-r border-gray-300 overflow-y-auto">
      <div className="p-4 text-xl font-semibold border-b border-gray-300">
        Chat
      </div>
      <ul className="p-4">
        {users.map((user, index) => (
          <li
            key={index}
            className="mb-4 flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            onClick={() => onUserSelect(user)}
          >
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.last_message || 'No message yet'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
