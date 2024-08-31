import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      {/* Dropdown Header */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-gray-200 cursor-pointer rounded-lg"
        onClick={toggleDropdown}
      >
        <span className="font-medium">Click to expand</span>
        {/* Arrow Icon */}
        <span
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="mt-2 p-4 border rounded-lg bg-white shadow-md">
          <p>This is the expanded content area.</p>
          <p>Additional details can go here.</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
