import React, { useState } from 'react';

const Advertising = ({ selectedOption, setSelectedOption }) => {

  const radioButtons = [
    { value: "To Campus", id: 1 },
    { value: "To Students", id: 2 },
    { value: "To Teacher", id: 3 },
    { value: "To Bike Riders", id: 4 },
    { value: "Mobile", id: 5 },
    { value: "All send Analysis report", id: 6 },

  ]
  return(
    <div className="bg-white p-5 rounded-lg shadow-md mb-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">Advertisement & Announcement</h1>
      <div className="mt-4 mb-4 flex justify-center">
        {radioButtons.map((item, index) => {
          return (
            <label className="mr-4" key={index}>
              <input
                type="radio"
                name="option"
                className="mr-2"
                value={item.value}
                checked={selectedOption === item.id}
                onChange={(e) => setSelectedOption(item.id)}
              />
              {item.value}
            </label>
          )
        })}

      
      </div>
      </div>
  )

}

export default Advertising
