import React, { useEffect, useState } from 'react';
import { call } from '../../../utils/helper';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';
import DeleteModal from '../DeleteModal';

const TeacherModal = ({ closeModal, dept }) => {
  const [uploads, setUploads] = useState([]);
  const [screenLoader, setScreenLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDept, setCurrentDept] = useState(false);

  const handleDelete = (dept) => {
    setCurrentDept(dept)
    setShowDeleteModal(true)
  };

  const getList = async (listLoader) => {
    try {
      listLoader && setScreenLoader(true);
      const formData = new FormData();
      formData.append('institute_id', dept?.institute_id);
      formData.append('role_id', 4);
      console.log('formData', formData);
      const response = await call('/admin/fetch_institute_teacher_and_student_list', 'POST', formData);
      setUploads(response?.data);
      setScreenLoader(false);
    } catch (error) {
      setUploads([]);
      setScreenLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const handleEditStatus = async (id) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', id)
      const response = await call('/admin/edit_status_teacher_and_student', 'POST', formData)
      await getList()
      setButtonLoader(false);
      setShowDeleteModal(false)
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const closeDeleteModal = () => {
    setCurrentDept(dept)
    setShowDeleteModal(false)
  };

  useEffect(() => {
    getList(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 shadow-md w-full max-w-lg sm:max-w-xl md:max-w-1xl lg:max-w-2xl">
        {screenLoader ? (
          <div className="w-full flex justify-center items-center">
            <Loader extraStyles="!static !bg-transparent" />
          </div>
        ) :
          <div className="bg-white p-6 shadow-md w-full max-w-lg sm:max-w-xl md:max-w-2xl">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Teachers</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Teacher Name</th>
                    <th className="px-4 py-2 border">Claim Code</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.map((item) => (
                    <tr key={item.user_id}>
                      <td className="px-4 py-2 border text-center">{item.name}</td>
                      <td className="px-4 py-2 border text-center">{item.claim_code}</td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          className={`px-3 py-2 ${item.account_status == 'active' ? 'bg-red-500' : 'bg-blue-500'}  text-white rounded-md`}
                          onClick={() => handleDelete(item)}
                        >
                          {item.account_status == 'active' ? 'InActive' : "Active"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}

        {showDeleteModal && (
          <DeleteModal
            confirmModal={() => handleEditStatus(currentDept.user_id)}
            isLoading={buttonLoader}
            delete_name={currentDept?.name}
            closeModal={closeDeleteModal}
            customMessage={`Are you sure you want to ${currentDept?.account_status == 'active' ? 'in active' : 'active'} ${currentDept?.name} account?`}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherModal;
