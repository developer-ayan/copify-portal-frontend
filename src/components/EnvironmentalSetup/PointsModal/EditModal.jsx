import React, { useState, useEffect } from "react";

const EditPointModal = ({
  isOpen,
  closeModal,
  onSave,
  currentPromo,
  isLoading,
}) => {
  const [eachOrder, setEachOrder] = useState("1");
  const [php, setPhp] = useState("");
  const [points, setPoints] = useState("");

  useEffect(() => {
    if (currentPromo) {
      setPoints(currentPromo.points);
    }
  }, [currentPromo]);

  const handleSave = () => {
    onSave(currentPromo.each_order, eachOrder, php, points);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Edit Points</h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>

          <div className="flex space-x-2 mt-4 justify-center items-center">
            <input
              id="instituteName"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="PHP"
              value={"1 PHP"}
              onChange={(e) => setPhp(e, setPhp)}
              disabled
            />
            <h1>=</h1>
            <input
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Earn points"
              type="number"
            />
          </div>

          <div className="flex space-x-2 mt-2 justify-center">
            <button
              className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Load" : "Save"}
            </button>
            <button
              className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPointModal;
