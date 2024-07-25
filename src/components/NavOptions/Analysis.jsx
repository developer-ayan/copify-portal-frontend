import React, { useState } from 'react';
import DonutChart from './DonutChart';

const Analysis = () => {
  const [formData, setFormData] = useState({
    department: '',
    course: '',
    section: '',
    adsAnnouncement: '',
    fromDate: '',
  });

  return (
    <div className="container">
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-8">Advertising and Announcement</h1>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">File Recipient</h2>
            <div className="mb-4">
              <label className="block mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
               
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                className="w-full p-2 border rounded"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Filter</button>
            <div className="mb-4">
              <label className="block mb-2">Ads & Announcement</label>
              <textarea
                name="adsAnnouncement"
                value={formData.adsAnnouncement}
                
                className="w-full p-2 border rounded h-32"
                placeholder='Message...'
              ></textarea>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Announcement Schedule</h2>
            <div className="mb-4">
              <label className="block mb-2"> Date Sent</label>
              <input
                type=""
                name="fromDate"
            
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block mb-2">Time 1</label>
                <DonutChart />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Time 2</label>
                <DonutChart />
              </div>
            </div>
          </div>
          <div className="flex-1">
          <h2 className="text-center text-lg font-semibold mb-4 mt-4">User Received Analysis</h2>

            <DonutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
