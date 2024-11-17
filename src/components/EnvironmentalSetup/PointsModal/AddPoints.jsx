import React, { useState } from "react";

const AddPointModal = ({ isOpen, closeModal, handleAddPoints, isLoading }) => {
  const [eachOrder, setEachOrder] = useState("1");
  const [points, setPoints] = useState("");
  const [php, setPhp] = useState("");

  const handleAdd = () => {
    if (eachOrder && php && points) {
      handleAddPoints(eachOrder, php, points);
    }
  };

  const handleNumericInput = (e, setter) => {
    const value = e.target.value;
    setter(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Points Handle
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
          {/* <div className="flex justify-center items-center space-x-4 mb-4"> */}
          {/* <input
              type="text"
              value={eachOrder}
              onChange={(e) => handleNumericInput(e, setEachOrder)}
              className="w-5/12 px-3 py-2 border rounded-md text-center mb-2"
              placeholder="Each Order"
            /> */}
          <div className="flex space-x-2 mt-4 justify-center items-center">
            <input
              id="instituteName"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="PHP"
              value={"1 PHP"}
              onChange={(e) => handleNumericInput(e, setPhp)}
              disabled
            />
            <h1>=</h1>
            <input
              id="instituteName"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Points"
              value={points}
              onChange={(e) => handleNumericInput(e, setPoints)}
              type="number"
            />
          </div>

          {/* <p className="text-lg font-medium mb-2">into</p> */}
          {/* </div> */}

          <div className="flex space-x-2 mt-4 justify-center">
            <button
              className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
              onClick={handleAdd}
              disabled={isLoading}
            >
              {isLoading ? "Load" : "Add"}
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

export default AddPointModal;
