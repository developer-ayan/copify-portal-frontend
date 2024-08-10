import React, { useContext, useEffect, useState } from 'react';
import DeleteModal from '../../components/Modals/DeleteModal';
import EditInstituteModal from '../../components/Modals//EducationEdit';
import AddDepartmentModal from '../../components/Modals/addDepart';
import { Loader } from '../Loaders';
import { call } from '../../utils/helper';
import toast from 'react-hot-toast';
import { AppContext } from '../../context';
import EditDepartmentModal from './editDepartment';

const ViewInstitutesModal = ({ closeModal, dept }) => {
  const { user } = useContext(AppContext);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [departments, setDepartments] = useState([
    // { name: 'Department of Biochemistry' , semester : ''},
    // { name: 'Department of BioTechnology' },
    // { name: 'Department of Mathematics' },
  ]);


  const handleSelection = (institute) => {
    setSelectedInstitute(institute);
  };

  const handleDelete = (department) => {
    setCurrentDepartment(department);
    setShowDeleteModal(true);
    setButtonLoader(false)
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDepartmentToDelete(null);
    setButtonLoader(false)
  };

  const handleEditOpen = (institute) => {
    setCurrentDepartment(institute);
    setShowEditModal(true);
    setButtonLoader(false)
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentDepartment(null);
    setButtonLoader(false)
  };

  // const handleSave = (originalName, newName, newLocation) => {
  //   setDepartments(departments.map(department =>
  //     department.name === originalName
  //       ? { ...department, name: newName, location: newLocation }
  //       : department
  //   ));
  // };
  const handleEdit = async (originalName, newName, newSemester) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('department_id', currentDepartment?.department_id)
      formData.append('department_name', newName)
      // formData.append('department_semester', newSemester)
      console.log('formData', formData)
      const response = await call('/admin/edit_department', 'POST', formData)
      await getList()
      closeEditModal()
      setShowAddModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };

  const openAddModal = () => {
    setButtonLoader(false)
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const addDepartment = async (newDepartmentName, newSemester) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('institute_id', dept?.institute_id)
      formData.append('department_name', newDepartmentName)
      // formData.append('department_semester', newSemester)
      const response = await call('/admin/create_department', 'POST', formData)
      await getList()
      closeAddModal()
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };


  const deleteDepartment = async () => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('department_id', currentDepartment?.department_id)
      const response = await call('/admin/delete_department', 'POST', formData)
      await getList()
      closeDeleteModal();
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
      const formData = new FormData()
      formData.append('institute_id', dept?.institute_id)
      const response = await call('/admin/fetch_department_list', 'POST', formData)
      setScreenLoader(false)
      setDepartments(response?.data)
    } catch (error) {
      setScreenLoader(false)
      toast.success(error?.message, { duration: 2000 })
    }
  };

  console.log('dept' , dept)

  useEffect(() => {
    getList(true)
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg sm:max-w-xl md:max-w-1xl lg:max-w-2xl">

        {screenLoader ? <div className="w-full flex justify-center items-center">
          <Loader extraStyles="!static !bg-transparent" />
        </div> :
          <div>
            <h3 className="text-xl font-semibold mb-4">Departments of {dept?.institute_name}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Department</th>
                    {/* <th className="px-4 py-2 border">Semester</th> */}
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border text-center">{department.department_name}</td>
                      {/* <td className="px-4 py-2 border text-center">{department.department_semester}</td> */}
                      <td className="px-4 py-2 border flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
                        <button
                          className="px-3 py-2 bg-blue-500 text-white rounded-md"
                          onClick={() => handleEditOpen(department)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleDelete(department)}
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
                + Add Department
              </button>
              <button
                className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>}

      </div>

      {showDeleteModal && (
        <DeleteModal confirmModal={deleteDepartment} isLoading={buttonLoader} delete_name={currentDepartment?.department_name} closeModal={closeDeleteModal} />
      )}
      {showEditModal && (
        <EditDepartmentModal
        isLoading={buttonLoader}
          isOpen={showEditModal}
          onClose={closeEditModal}
          onSave={handleEdit}
          dept={currentDepartment}
        />
      )}
      {showAddModal && (
        <AddDepartmentModal
          isLoading={buttonLoader}
          isOpen={showAddModal}
          closeModal={closeAddModal}
          addDepartment={addDepartment}
        />
      )}
    </div>
  );
};

export default ViewInstitutesModal;
