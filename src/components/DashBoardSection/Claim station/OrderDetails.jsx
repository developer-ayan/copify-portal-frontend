import React, { useState } from 'react';
import DonutChart from '../../NavOptions/DonutChart';
import StudentModal from "./ClaimModal"; 

const OrderDetails = () => {
  const [formData, setFormData] = useState({
    claimCode: 'CDK000001',
    numberOfOrders: '1',
    totalPagesUnpaid: '25',
    totalPrintingFee: '50',
    rushPrinting: '15',
    deliveryCharge: '15',
    totalPayment: '80',
    totalWalletPaid: '0',
    folderNumber: '05',
    paymentStatus: 'COD',
  });

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container border mx-auto px-8">
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-8">Claim Station Dashboard</h1>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-[2]">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-4">Enter the claim code:</h2>
              <div className="flex items-center">
                <input
                  type="text"
                  name="claimCode"
                  value={formData.claimCode}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 border rounded"
                  placeholder="CDK000001"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-4">CLEAR</button>
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Overall Unclaimed Orders Details:</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 mt-2">No. Pages</h3>
              {[
                { label: 'Number of Orders', name: 'numberOfOrders' },
                { label: 'Total Pages Unpaid', name: 'totalPagesUnpaid' },
                { label: 'Total Printing Fee', name: 'totalPrintingFee' },
              ].map((field, idx) => (
                <div className="flex items-center text-center" key={idx}>
                  <label className="block mb-1 w-1/2 text-right">{field.label}:</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-1/4 ml-4 border text-center"
                  />
                </div>
              ))}
              <h3 className="text-lg font-semibold mb-2 mt-2">Other Charges:</h3>
              {[
                { label: 'Rush Printing', name: 'rushPrinting' },
                { label: 'Delivery Charge', name: 'deliveryCharge' },
              ].map((field, idx) => (
                <div className="flex items-center text-center" key={idx}>
                  <label className="block mb-1 w-1/2 text-right">{field.label}:</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-1/4 ml-4 border text-center"
                  />
                </div>
              ))}
              <div className="mt-4 mb-6">
                {['totalPayment', 'totalWalletPaid', 'folderNumber', 'paymentStatus'].map((field, idx) => (
                  <div className="flex items-center" key={idx}>
                    <label className="block mb-1 w-1/2 capitalize text-lg font-semibold text-right">
                      {field.replace(/([A-Z])/g, ' $1')}:
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-1/4 ml-4 border rounded text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border p-4 flex-[2] font-sans">
            <h2 className="text-xl font-bold mb-4">First Order Details</h2>
            <div className="mb-5">
              <p className="text-lg font-bold mb-4">Details: Educ 101 - Section A Page</p>
              <div className="flex items-start mb-2">
                <input type="radio" id="lesson1" name="order" className="mt-1 mr-2" />
                <div>
                  <label htmlFor="lesson1" className="cursor-pointer">
                    <p className="text-lg font-semibold">Lesson 1: Teaching Technology</p>
                    <div className="ml-4">
                      <p>Page Number: 10 pages</p>
                      <p>Total Price: Php. 20.00</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <input type="radio" id="module1" name="order" className="mt-1 mr-2" />
                <div>
                  <label htmlFor="module1" className="cursor-pointer">
                    <p className="text-lg font-semibold">Module 1: Theory of Teaching</p>
                    <div className="ml-4">
                      <p>Page Number: 15 Pages</p>
                      <p>Total Price: Php. 30.00</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Total Order Price:</p>
                <p>Php. 50.00</p>
              </div>
              <div className="mt-2 mb-2"></div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Rush Printing Charge:</p>
                <p>Php. 15.00</p>
              </div>
              <div className="mt-2 mb-2"></div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Delivery Rider Charge:</p>
                <p>Php. 15.00</p>
              </div>
              <div className="mt-2 mb-2"></div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Overall Total Charge:</p>
                <p>Php. 80.00</p>
              </div>
              <div className="mt-2 mb-2"></div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Payment Status:</p>
                <p className="text-center">COD</p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={openModal}
            >
              Claim Now
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            <h2 className="text-center text-lg font-semibold mb-4 mt-4">User Received Analysis</h2>
            <DonutChart />
          </div>
        </div>
      </div>
      {isModalOpen && <StudentModal closeModal={closeModal} />} 
    </div>
  );
};

export default OrderDetails;
