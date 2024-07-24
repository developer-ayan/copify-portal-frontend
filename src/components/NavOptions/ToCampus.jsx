import React from 'react';
import PieChart from './PieChart';

const AnnouncementAndAdvertisement = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Combined File Recipient and Announcement Schedule Section */}
        <div className="bg-white p-4 rounded shadow lg:col-span-4">
        <h1 className="text-2xl font-bold text-center mb-8">Advertising and Announcement</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-4">File Recipient</h2>
              <div className="mb-4">
                <label className="block mb-2">Department</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Course</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Section</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Filter</button>
              <div className="mb-4">
                <label className="block mb-2">Ads & Announcement</label>
                <textarea className="w-full p-2 border rounded h-32"></textarea>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Announcement Schedule</h2>
              <div className="mb-4">
                <label className="block mb-2">From Date</label>
                <input type="" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Time 1</label>
                <input type="" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Time 2</label>
                <input type="" className="w-full p-2 border rounded" />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">+ Add Time</button>
              <div className="mb-4">
                <label className="block mb-2">To Date</label>
                <input type="" className="w-full p-2 border rounded" />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
            </div>
          </div>
        </div>

        {/* User Received Analysis Section */}
        <PieChart />
          {/* Add more analysis components as needed */}
       
      </div>
    </div>
  );
};

export default AnnouncementAndAdvertisement;
