import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../../Loaders';
import DeliveryEdit from '../PagesModal/PagesEditModal';
import DeliveryAdd from "../PagesModal/AddPagesModal";
import DeleteModal from "../PagesModal/DeleteModal"
import toast from 'react-hot-toast';
import { call } from '../../../utils/helper';
import { AppContext } from '../../../context';

const Pages = () => {
  const { user } = useContext(AppContext);
  const [showDelivery, setShowDelivery] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleAddDelivery = async (newDelivery, newColorFulPrice, newBlackAndWhitePrice) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('paper_size', newDelivery)
      formData.append('colorful_paper_price', newColorFulPrice)
      formData.append('black_and_white_paper_size_price', newBlackAndWhitePrice)
      const response = await call('/admin/create_paper_size', 'POST', formData)
      await getList()
      setShowDelivery(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const saveEdit = async (oldName, newName, colorful_price, black_and_white_price) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('paper_size', newName)
      formData.append('colorful_paper_price', colorful_price)
      formData.append('black_and_white_paper_size_price', black_and_white_price)
      formData.append('paper_size_id', currentDept?.paper_size_id)
      const response = await call('/admin/edit_paper_size', 'POST', formData)
      await getList()
      setShowEditModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const deleteShop = async (newDelivery) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('paper_size_id', currentDept?.paper_size_id)
      const response = await call('/admin/delete_paper_size', 'POST', formData)
      await getList()
      setButtonLoader(false);
      setShowDeleteModal(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const getList = async (listLoader) => {
    try {
      listLoader && setScreenLoader(true)
      const response = await call('/admin/fetch_paper_size_list', 'POST')
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

  return (
    <div className="mt-7 bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-7">
      {screenLoader ? (
        <div className="w-full flex justify-center items-center">
          <Loader extraStyles="!static !bg-transparent" />
        </div>
      ) : <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Paper Sizes</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowDelivery(true)}
            disabled={isLoading}
          >
            + Add Paper size
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border w-1/4">Paper Size</th>
                <th className="px-4 py-2 border w-1/4">Colorful price</th>
                <th className="px-4 py-2 border w-1/4">Black & white prcie</th>
                <th className="px-4 py-2 border w-1/4">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.paper_size}</td>
                  <td className="px-4 py-2 border text-center">{upload.colorful_paper_price}</td>
                  <td className="px-4 py-2 border text-center">{upload.black_and_white_paper_size_price}</td>
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
      </div>}

      {showDeleteModal && (
        <DeleteModal isLoading={buttonLoader} delete_name={currentDept?.paper_size} confirmModal={() => deleteShop()} closeModal={() => setShowDeleteModal(false)} />
      )}

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

export default Pages;
