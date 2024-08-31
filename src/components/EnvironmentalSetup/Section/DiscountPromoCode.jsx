import React, { useContext, useEffect, useState } from 'react';
import AddShopModal from '../DiscountPromoModal/AddPromoModal';
import EditPromoModal from '../DiscountPromoModal/EditPromoModal';
import ShopDeleteModal from '../DiscountPromoModal/DeletePromoModal';
import { AppContext } from '../../../context';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';
import { call, formatDate } from '../../../utils/helper';

const DiscountPromoCode = () => {
  const { user } = useContext(AppContext);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddShop = async (startDate, endDate, promoCode, discount) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('start_date', startDate)
      formData.append('end_date', endDate)
      formData.append('promo_code', promoCode)
      formData.append('discount', discount)
      const response = await call('/admin/create_promo_code', 'POST', formData)
      await getList()
      setShowAddShopModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }

  };


  const handleEdit = (shop) => {
    setCurrentDept(shop);
    setShowEditModal(true);
  };


  const deleteShop = async () => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('promo_code_id', currentDept?.promo_code_id)
      const response = await call('/admin/delete_promo_code', 'POST', formData)
      await getList()
      setShowDeleteModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };


  const saveEdit = async (originalPromoCode, newPromoCode, newStartDate, newEndDate, discount) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('promo_code_id', currentDept?.promo_code_id)
      formData.append('start_date', newStartDate)
      formData.append('end_date', newEndDate)
      formData.append('promo_code', newPromoCode)
      formData.append('discount', discount)
      const response = await call('/admin/edit_promo_code', 'POST', formData)
      await getList()
      setShowEditModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const getList = async (listLoader) => {
    try {
      listLoader && setScreenLoader(true)
      const response = await call('/admin/fetch_promo_code_list', 'POST')
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
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 mt-7 sm:mx-4 md:mx-8 lg:mx-7">
      {screenLoader ? (
        <div className="w-full flex justify-center items-center">
          <Loader extraStyles="!static !bg-transparent" />
        </div>
      ) :
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
                  <th className="px-4 py-2 border">Discount</th>
                  <th className="px-4 py-2 border">Start Date</th>
                  <th className="px-4 py-2 border">End Date</th>
                  <th className="px-4 py-2 border">Promo Code</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}className={`${isTableExpanded ? '' : 'hidden'} mt-4 overflow-x-auto`}>
                    <td className="px-4 py-2 border text-center">{upload.discount}%</td>
                    <td className="px-4 py-2 border text-center">{formatDate(upload.start_date)}</td>
                    <td className="px-4 py-2 border text-center">{formatDate(upload.end_date)}</td>
                    <td className="px-4 py-2 border text-center">{upload.promo_code}</td>
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
      }


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
