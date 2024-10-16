import React, { useEffect, useState } from 'react';
import DonutChart from '../../NavOptions/DonutChart';
import { Loader } from '../../Loaders';
import { call, toFixedMethod } from '../../../utils/helper';
import toast from 'react-hot-toast';
import NotFound from '../../Error/NotFound';

const OrderDetails = ({ item }) => {
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
  const [loader, setLoader] = useState(false);
  const [uploads, setUploads] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const getOrders = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", Number(item?.user_id));
      const response = await call("/app/fetch_All_orders", "POST", formData);
      setUploads(response?.data);
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await getOrders()
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs()
  }, [item])
  

  const total_order_price = uploads.reduce((acc, order) => {
    const orderTotal = order.subjectFiles.reduce((sum, file) => sum + parseFloat(file.total_price), 0); // Sum total_price for subjectFiles
    return acc + orderTotal; // Add to accumulator
  }, 0); // Initial accumulator value is 0

  const total_delivery_charges = uploads.reduce((acc, order) => {
    return acc + parseFloat(order.rider_charges || 0); // Ensure rider_charges is parsed as a number, and handle cases where it's missing
  }, 0); // Start with an initial value of 0
  const total_price = uploads.reduce((acc, order) => {
    return acc + parseFloat(order.total_price || 0); // Ensure rider_charges is parsed as a number, and handle cases where it's missing
  }, 0); // Start with an initial value of 0

  const priorityCount = uploads.filter(order => order.priority === true).length * 10

  const overAllTotal = parseFloat(toFixedMethod(total_order_price)) + parseFloat(toFixedMethod(total_delivery_charges)) + parseFloat(toFixedMethod(total_price)) + parseFloat(toFixedMethod(priorityCount))

  console.log("total_order_price", total_price)



  return (
    <div className="container border mx-auto px-8">
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 rounded shadow w-full">
          <h1 className="text-2xl font-bold text-center mb-8">Claim Station Dashboard</h1>
          <div className="flex flex-col lg:flex-row gap-5">
            {uploads?.length > 0 ?
              <div className="border p-4 flex-[2] font-sans">
                {/* <h2 className="text-xl font-bold mb-4">First Order Details</h2> */}
                {uploads.map((order, orderIndex) => (
                  order.subjectFiles.map((file, fileIndex) => (
                    <div key={file._id} className="mb-5">
                      <div className="flex items-start mb-2">
                        <input type="radio" id={`lesson${fileIndex}`} name="order" className="mt-1 mr-2" />
                        <div>
                          <label htmlFor={`lesson${fileIndex}`} className="cursor-pointer">
                            <p className="text-lg font-semibold">{file.title + " - " + file.description}</p>
                            <div className="ml-4">
                              <p>Page Number: {file.page_number} pages</p>
                              <p>Total Price: Php. {parseFloat(file.total_price).toFixed(2)}</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))
                ))}

                <div className="mb-4">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Total Order Price:</p>
                    <p>Php. {toFixedMethod(total_order_price)}</p>
                  </div>
                  <div className="mt-2 mb-2"></div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Priority Printing Charge:</p>
                    <p>Php. {toFixedMethod(priorityCount)}</p>
                  </div>
                  <div className="mt-2 mb-2"></div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Delivery Rider Charge:</p>
                    <p>Php. {toFixedMethod(total_delivery_charges)}</p>
                  </div>
                  <div className="mt-2 mb-2"></div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Overall Total Charge:</p>
                    <p>Php. {toFixedMethod(overAllTotal)}</p>
                  </div>
                  <div className="mt-2 mb-2"></div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Payment Status:</p>
                    <p className="text-center">ONLINE</p>
                  </div>
                </div>
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Claim Now</button> */}
              </div>

              :
              <div className="flex justify-center items-center w-full h-full border mx-auto px-8">
                <NotFound removeBorder text={"No record found"} />
              </div>
            }
            {uploads?.length > 0 ?
              <div className="flex-1 flex flex-col">
                <h2 className="text-center text-lg font-semibold mb-4 mt-4">User Received Analysis</h2>
                <DonutChart />
              </div> : <></>
            }

          </div>
        </div>
      )}

    </div>
  );
};

export default OrderDetails;
