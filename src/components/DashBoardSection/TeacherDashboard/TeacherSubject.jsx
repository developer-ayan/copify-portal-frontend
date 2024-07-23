import React, { useState } from 'react';
import WalletDashboard from './WalletDashboard';

const TeacherSubscribe = () => {
  const [uploads, setUploads] = useState([
    { name: 'Module 3', date: 'Date & Time', status: 'Cancel' },
    { name: 'Activity 2', date: 'Date & Time', status: 'Cancel' },
    { name: 'Assignment 5', date: 'Date & Time', status: 'Cancel' },
  ]);

  return (
    <div className="min-h-screen p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Calendar Activity - Publish Later Features</h2>
          </div>
          <div className="mb-4 flex items-center">
            <label className="block font-semibold mr-4">Select Subject Page:</label>
            <input
              type="text"
              className="w-full sm:w-1/4 md:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              value="Bio101-Section A"
              readOnly
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">
              + Add Upload File
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Particular File Name</th>
                  <th className="px-4 py-2 border">Date Published</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{upload.name}</td>
                    <td className="px-4 py-2 border">{upload.date}</td>
                    <td className="px-4 py-2 border flex flex-wrap gap-2 justify-center">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/3">
          <WalletDashboard />
        </div>
      </div>
    </div>
  );
};

export default TeacherSubscribe;
