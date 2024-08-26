import React, { useContext, useEffect, useState } from 'react';
import AddShopModal from '../DiscountPromoModal/AddPromoModal';
import EditPromoModal from '../DiscountPromoModal/EditPromoModal'; 
import ShopDeleteModal from '../DiscountPromoModal/DeletePromoModal'; 
import { AppContext } from '../../../context';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';

const DiscountPromoCode = () => {
  const { user } = useContext(AppContext);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false); 
  const [currentDept, setCurrentDept] = useState(null); 
  const [uploads, setUploads] = useState([]);


  const handleAddShop = (startDate, endDate, promoCode) => {
    const newShop = {
      startDate,
      endDate,
      promoCode,
      status: "",
    };
    setUploads([...uploads, newShop]);
    setShowAddShopModal(false);
    toast.success('Promo added successfully', { duration: 2000 });
  };

 
  const handleEdit = (shop) => {
    setCurrentDept(shop);
    setShowEditModal(true); 
  };

  
  const deleteShop = () => {
    setUploads(uploads.filter(upload => upload.promoCode !== currentDept?.promoCode));
    setShowDeleteModal(false);
    toast.success('Promo deleted successfully', { duration: 2000 });
  };


  const saveEdit = (originalPromoCode, newPromoCode, newStartDate, newEndDate) => {
    setUploads(uploads.map(upload =>
      upload.promoCode === originalPromoCode
        ? { ...upload, promoCode: newPromoCode, startDate: newStartDate, endDate: newEndDate }
        : upload
    ));
    setShowEditModal(false); 
    toast.success('Promo updated successfully', { duration: 2000 });
  };

  useEffect(() => {
    setScreenLoader(false);
  }, []);

  return screenLoader ? (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <Loader extraStyles="!static !bg-transparent" />
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 mt-7 sm:mx-4 md:mx-8 lg:mx-7">
      <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Discount Promo code</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowAddShopModal(true)}
          >
            + Discount Promo code
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Promo Code</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.startDate}</td>
                  <td className="px-4 py-2 border text-center">{upload.endDate}</td>
                  <td className="px-4 py-2 border text-center">{upload.promoCode}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(upload)} 
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => { setCurrentDept(upload); setShowDeleteModal(true); }} 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddShopModal && (
        <AddShopModal
          isOpen={showAddShopModal}
          closeModal={() => setShowAddShopModal(false)}
          addDepartment={handleAddShop}
          isLoading={buttonLoader}
        />
      )}

      {showDeleteModal && (
        <ShopDeleteModal
          isLoading={buttonLoader}
          delete_name={currentDept?.promoCode}
          confirmModal={deleteShop}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}

      {showEditModal && (
        <EditPromoModal
          isOpen={showEditModal} 
          closeModal={() => setShowEditModal(false)}
          onSave={saveEdit}
          currentPromo={currentDept} 
          isLoading={buttonLoader}
        />
      )}
    </div>
  );
};

export default DiscountPromoCode;
