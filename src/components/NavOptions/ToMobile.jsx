import React from 'react';

const AnnouncementAndAdvertisement = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <h1></h1>
        {/* File Recipient Section */}
        <div className="bg-white p-4 rounded shadow lg:col-span-3">
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

        {/* Announcement Schedule Section */}
        <div className="bg-white p-4 rounded shadow lg:col-span-3">
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

        {/* User Received Analysis Section */}
        <div className="lg:col-span-1 lg:row-span-2">
          <h2 className="text-xl font-bold mb-4 text-center">User Received Analysis</h2>
          <div className="flex justify-center items-center">
            <div>
              <p className="text-center mb-2">Time: 1</p>
              <div className="w-32 h-32 rounded-full border-4 border-gray-300 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-8 border-purple-500 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold">83.3%</p>
                    <p className="text-sm">Received</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default AnnouncementAndAdvertisement;
