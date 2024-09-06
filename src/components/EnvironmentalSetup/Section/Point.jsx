import React, { useContext, useEffect, useState } from 'react';
import AddPointModal from '../PointsModal/AddPoints';
import EditPointModal from '../PointsModal/EditModal';
import { AppContext } from '../../../context';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';
import { call } from '../../../utils/helper';

const Point = () => {
  const { user } = useContext(AppContext);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(null);
  const [uploads, setUploads] = useState([]);

  const handleAddPoints = async (points, php) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('points', points)
      formData.append('php', php)
      const response = await call('/admin/create_point_into_php', 'POST', formData)
      await getList()
      setShowAddShopModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const handleEdit = (promo) => {
    setCurrentPromo(promo);
    setShowEditModal(true);
  };

  const saveEdit = async (originalPoints, newPoints, newPhp) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('point_into_php_id', currentPromo?.point_into_php_id)
      formData.append('points', newPoints)
      formData.append('php', newPhp)
      const response = await call('/admin/edit_point_into_php', 'POST', formData)
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
      const response = await call('/admin/fetch_point_into_php_list', 'POST')
      console.log('response', response)
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
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 mt-7 sm:mx-4 md:mx-8 lg:mx-7">
      {screenLoader ? (
        <div className="w-full flex justify-center items-center">
          <Loader extraStyles="!static !bg-transparent" />
        </div>
      ) :
        <div className="w-full mb-4 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Points</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setShowAddShopModal(true)}
            >
              + Add Points
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Points</th>
                  <th className="px-4 py-2 border">PHP</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border text-center">{upload.points}</td>
                    <td className="px-4 py-2 border text-center">{upload.php}</td>
                    <td className="px-4 py-2 border flex space-x-2 justify-center">
                      <button
                        className="px-3 py-2 bg-blue-500 text-white rounded-md"
                        onClick={() => handleEdit(upload)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>}


      {showAddShopModal && (
        <AddPointModal
          isOpen={showAddShopModal}
          closeModal={() => setShowAddShopModal(false)}
          handleAddPoints={handleAddPoints}
          isLoading={buttonLoader}
        />
      )}

      {showEditModal && (
        <EditPointModal
          isOpen={showEditModal}
          closeModal={() => setShowEditModal(false)}
          onSave={saveEdit}
          currentPromo={currentPromo}
          isLoading={buttonLoader}
        />
      )}
    </div>
  );
};

export default Point;
