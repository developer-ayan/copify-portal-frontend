import React, { useContext, useEffect, useState } from "react";
import DeleteModal from "../../Modals/DeleteModal";
import ViewModal from "../../Modals/ViewModal";
import UploadModal from "../../Modals/AddInstitute";
import EditInstituteModal from "../../Modals/EducationEdit";
import SubjectModal from "../../Modals/SubjectModal/SubjectModal";
import StudentModal from "../../Modals/Student/StudentModal";
import TeacherModal from "../../Modals/Teacher/TeacherModal";
import { AppContext } from "../../../context";
import toast from "react-hot-toast";
import { call } from "../../../utils/helper";
import { Loader } from "../../Loaders";
import { riderAccountStatus } from "../../../constants/data";

const RiderStatus = ({ selectedOption }) => {
  const { user } = useContext(AppContext);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false); // State for Teacher Modal
  const [block, setBlock] = useState(false); // State for Teacher Modal
  const [uploads, setUploads] = useState([]);

  const getList = async (listLoader) => {
    try {
      setBlock(false);
      listLoader && setScreenLoader(true);
      const response = await call("/admin/fetch_rider_list", "POST");
      const filter = response.data;
      const apply = response.data.filter(
        (item, index) =>
          item.rider_status_for_student == riderAccountStatus.apply
      );
      const blocked = response.data.filter(
        (item, index) =>
          item.rider_status_for_student == riderAccountStatus.blocked
      );
      const approved = response.data.filter(
        (item, index) =>
          item.rider_status_for_student == riderAccountStatus.approve
      );
      const whickDataShow = () => {
        if (selectedOption == 1) {
          return filter;
        } else if (selectedOption == 2) {
          return apply;
        } else if (selectedOption == 3) {
          return blocked;
        } else if (selectedOption == 4) {
          return approved;
        } else {
          return [];
        }
      };

      setScreenLoader(false);
      setUploads(whickDataShow());
      // console.log("respons" , response)
    } catch (error) {
      setUploads([]);
      setScreenLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const ApproveRider = async () => {
    try {
      setBlock(false);
      setButtonLoader(true);
      const formData = new FormData();
      formData.append("user_id", Number(currentDept?.user_id));
      formData.append("rider_status_for_student", riderAccountStatus?.approve);
      console.log("formData", formData);
      const response = await call("/app/edit_rider_status", "POST", formData);
      await getList();
      setButtonLoader(false);
      setShowDeleteModal(false);
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const BlockUser = async () => {
    try {
      setBlock(false);
      setButtonLoader(true);
      const formData = new FormData();
      formData.append("user_id", Number(currentDept?.user_id));
      formData.append("rider_status_for_student", riderAccountStatus?.blocked);
      console.log("formData", formData);
      const response = await call("/app/edit_rider_status", "POST", formData);
      await getList();
      setButtonLoader(false);
      setShowDeleteModal(false);
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const handleEdit = (institute) => {
    setCurrentDept(institute);
    setShowEditModal(true);
  };

  useEffect(() => {
    getList(true);
  }, [selectedOption]);

  return screenLoader ? (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <Loader extraStyles="!static !bg-transparent" />
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-7">
      <div className="w-full mb-4 md:mb-0">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Rider name</th>
                <th className="px-4 py-2 border">Claim Code</th>
                {/* <th className="px-4 py-2 border">Status</th> */}
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">
                    {upload.name}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {upload.claim_code}
                  </td>
                  {/* <td className="px-4 py-2 border text-center">
                    {upload.rider_status_for_student}
                  </td> */}
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    {/* <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => { setCurrentDept(upload); setShowSubjectModal(true); }}
                    >
                      Subject
                    </button> */}
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => {
                        setCurrentDept(upload);
                        upload.rider_status_for_student ==
                          riderAccountStatus.apply && setShowDeleteModal(true);
                      }}
                    >
                      {upload.rider_status_for_student}
                    </button>
                    {upload.rider_status_for_student ==
                    riderAccountStatus.approve ? (
                      <>
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => {
                            setCurrentDept(upload);
                            setBlock(true);
                            setShowDeleteModal(true);
                          }}
                        >
                          {"Blocked"}
                        </button>
                      </>
                    ) : (
                      <></>
                    )}

                    {upload.rider_status_for_student ==
                    riderAccountStatus.blocked ? (
                      <>
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => {
                            setCurrentDept(upload);
                            setShowDeleteModal(true);
                          }}
                        >
                          {"re-approve"}
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => {
                        setCurrentDept(upload);
                        setShowTeacherModal(true);
                      }} // New Teacher button
                    >
                      Teachers
                    </button> */}

                    {/* <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(upload)}
                    >
                      Edit
                    </button> */}
                    {/* <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => {
                        setCurrentDept(upload);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal
          isLoading={buttonLoader}
          customMessage={`You want to ${
            block
              ? currentDept?.rider_status_for_student ==
                riderAccountStatus.blocked
                ? "re-approve"
                : "block"
              : "approve"
          } this rider?`}
          confirmModal={() => (block ? BlockUser() : ApproveRider())}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}

      {showSubjectModal && (
        <SubjectModal
          dept={currentDept}
          closeModal={() => setShowSubjectModal(false)}
        />
      )}

      {showStudentModal && (
        <StudentModal
          dept={currentDept}
          closeModal={() => setShowStudentModal(false)}
        />
      )}

      {showTeacherModal && (
        <TeacherModal
          dept={currentDept}
          closeModal={() => setShowTeacherModal(false)}
        />
      )}
    </div>
  );
};

export default RiderStatus;
