import React, { useState } from 'react';
import WalletDashboard from './WalletDashboard';

const TeacherSubscribe = () => {
  const [uploads, setUploads] = useState([
    { name: 'Student 1', course: 'BSed English', year: '2nd year' },
    { name: 'Student 2', course: 'BSed Mathematics', year: '2nd year' },
    { name: 'Student 3', course: 'BSed Social Studies', year: '3rd year' },
  ]);

  return (
    <div className="min-h-screen p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between">
        <div className="md:w-2/3 w-full mb-4 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Subscribe Student Details</h2>
          </div>
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label className="block font-semibold mr-4 mb-2 sm:mb-0">Select Subject Page:</label>
            <input
              type="text"
              className="w-full sm:w-1/4 md:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              value="Bio101-Section A"
              readOnly
            />
            <label className="block font-semibold mr-4 ml-0 sm:ml-4 mb-2 sm:mb-0">Total Subscribers:</label>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              value='38'
              readOnly
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">List of Name</th>
                  <th className="px-4 py-2 border">Course & Major</th>
                  <th className="px-4 py-2 border">Year Level</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{upload.name}</td>
                    <td className="px-4 py-2 border">{upload.course}</td>
                    <td className="px-4 py-2 border">{upload.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-1/3 w-full">
          <WalletDashboard />
        </div>
      </div>
    </div>
  );
};

export default TeacherSubscribe;
