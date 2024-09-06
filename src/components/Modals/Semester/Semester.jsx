import React, { useContext, useEffect, useState } from 'react';
import DeleteModal from './DeleteSemester';
import AddSemesterModal from './AddSemester';
import EditSemesterModal from './EditSemester';
import { Loader } from '../../Loaders';
import toast from 'react-hot-toast';
import { AppContext } from '../../../context';
import { call } from '../../../utils/helper';

const Semester = ({ closeModal, dept }) => {
  const { user } = useContext(AppContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [semesters, setSemesters] = useState([
    { semester_name: 'Fall 2024' },
    { semester_name: 'Spring 2024' },
    { semester_name: 'Summer 2024' },
  ]);
  const [currentSemester, setCurrentSemester] = useState(null);

  const handleDelete = (semester) => {
    setCurrentSemester(semester);
    setShowDeleteModal(true);
    setButtonLoader(false);
  };

  const handleEditOpen = (semester) => {
    setCurrentSemester(semester);
    setShowEditModal(true);
    setButtonLoader(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentSemester(null);
    setButtonLoader(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentSemester(null);
  };

  const deleteSemester = async () => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('semester_id', currentSemester?.semester_id)
      const response = await call('/admin/delete_semester', 'POST', formData)
      await getList()
      closeDeleteModal();
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const openAddModal = () => {
    setButtonLoader(false);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const addSemester = async (newSemesterName) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('semester_name', newSemesterName)
      formData.append('department_id', dept?.department_id)
      console.log('formData', formData)
      const response = await call('/admin/create_semester', 'POST', formData)
      await getList()
      setButtonLoader(false);
      closeAddModal();
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const editSemester = async (updatedSemesterName) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('semester_id', currentSemester?.semester_id)
      formData.append('semester_name', updatedSemesterName)
      const response = await call('/admin/edit_semester', 'POST', formData)
      await getList()
      closeEditModal();
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
      const formData = new FormData()
      formData.append('department_id', dept?.department_id)
      const response = await call('/admin/fetch_semester_list', 'POST', formData)
      console.log('response', response)
      setScreenLoader(false)
      setSemesters(response?.data)
    } catch (error) {
      setSemesters([])
      setScreenLoader(false)
      toast.error(error?.message, { duration: 2000 })
    }
  };

  useEffect(() => {
    getList(true)
  }, [])


  console.log('semesters', dept)

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 shadow-md w-full max-w-lg sm:max-w-xl md:max-w-1xl lg:max-w-2xl">
        {screenLoader ? (
          <div className="w-full flex justify-center items-center">
            <Loader extraStyles="!static !bg-transparent" />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Semester {dept?.institute_name}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Semester</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {semesters.map((semester, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border text-center">{semester.semester_name}</td>
                      <td className="px-4 py-2 border flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
                        <button
                          className="px-3 py-2 bg-blue-500 text-white rounded-md"
                          onClick={() => handleEditOpen(semester)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleDelete(semester)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                className="w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                onClick={openAddModal}
              >
                + Add Semester
              </button>
              <button
                className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <DeleteModal
          confirmModal={deleteSemester}
          isLoading={buttonLoader}
          delete_name={currentSemester?.semester_name}
          closeModal={closeDeleteModal}
        />
      )}

      {showAddModal && (
        <AddSemesterModal
          isLoading={buttonLoader}
          isOpen={showAddModal}
          closeModal={closeAddModal}
          addSemester={addSemester}
        />
      )}

      {showEditModal && (
        <EditSemesterModal
          isOpen={showEditModal}
          closeModal={closeEditModal}
          editSemester={editSemester}
          isLoading={buttonLoader}
          currentSemester={currentSemester}
        />
      )}
    </div>
  );
};

export default Semester;
