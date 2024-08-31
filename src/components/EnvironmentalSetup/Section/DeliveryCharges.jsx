import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../../Loaders';
import DeliveryEdit from '../DeliveryModal/DeliveryEdit';
import DeliveryAdd from "../DeliveryModal/DeliverAdd";
import toast from 'react-hot-toast';
import { call } from '../../../utils/helper';
import { AppContext } from '../../../context';

const DeliveryCharges = () => {
  const { user } = useContext(AppContext);
  const [showDelivery, setShowDelivery] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddDelivery = async (newDelivery) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('delivery_charges', newDelivery)
      console.log('formData', formData)
      const response = await call('/admin/create_delivery_charges', 'POST', formData)
      await getList()
      setShowDelivery(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };

  const saveEdit = async (oldName, newName) => {
    console.log('newName', newName)
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('delivery_charges', newName)
      formData.append('_id', currentDept?._id)
      console.log('formData', formData)
      const response = await call('/admin/edit_delivery_charges', 'POST', formData)
      await getList()
      setShowEditModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };

  const getList = async (listLoader) => {
    try {
      listLoader && setScreenLoader(true)
      const response = await call('/admin/fetch_delivery_charges_list', 'POST')
      setScreenLoader(false)
      setUploads(response?.data)
    } catch (error) {
      setUploads([])
      setScreenLoader(false)
      toast.error(error?.message, { duration: 2000 })
    }
  };

  useEffect(() => {
    getList(true)
  }, [])
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
    setIsTableExpanded(!isTableExpanded);
  
  }
  return (
    <div className="mt-7 bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-7">
      {screenLoader ? (
        <div className="w-full flex justify-center items-center">
          <Loader extraStyles="!static !bg-transparent" />
        </div>
      ) :
        <div className="w-full mb-4 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Fixed Delivery Charges</h2>
            {uploads?.length <= 0 ?
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setShowDelivery(true)}
                disabled={isLoading}
              >
                + Add Delivery Charges
              </button> : <></>
            }

          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
<div
  className="flex justify-between items-center cursor-pointer mb-4"
  onClick={toggleDropdown}
>
  <span
    className={`transform transition-transform duration-200 ml-auto ${
      isDropdownOpen ? 'rotate-180' : 'rotate-0'
    }`}
  >
    ▼
  </span>
</div>

      
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border w-1/2">Delivery Charges</th>
                  <th className="px-4 py-2 border w-1/2">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}className={`${isTableExpanded ? '' : 'hidden'} mt-4 overflow-x-auto`}>
                    <td className="px-4 py-2 border text-center">{upload.delivery_charges}</td>
                    <td className="px-4 py-2 border flex space-x-2 justify-center">
                      <button
                        className="px-3 py-2 bg-blue-500 text-white rounded-md"
                        onClick={() => {
                          setCurrentDept(upload);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }


      {showEditModal && (
        <DeliveryEdit
          isLoading={buttonLoader}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={saveEdit}
          dept={currentDept}
        />
      )}
      {showDelivery && (
        <DeliveryAdd
          show={showDelivery}
          onClose={() => setShowDelivery(false)}
          onSave={handleAddDelivery}
          isLoading={buttonLoader}
        />
      )}
    </div>
  );
};

export default DeliveryCharges;
