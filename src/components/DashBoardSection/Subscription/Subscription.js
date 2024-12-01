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
import Page from "../../Page";
import SubscriptionRenewModal from "../../Modals/subsciptionRenewModal";

const Subscription = ({ selectedOption }) => {
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
            const response = await call("/admin/fetch_subscription_list", "POST");
            const filter = response.data;
            setScreenLoader(false);
            setUploads(filter);
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

    const handleEditPlan = async (subsrciption_plan_id) => {
        try {
            setButtonLoader(true)
            const formData = new FormData()
            formData.append('user_id', currentDept?.user_id)
            formData.append('subsrciption_plan_id', subsrciption_plan_id)
            const response = await call('/app/edit_subscription_plan', 'POST', formData)
            await getList()
            setButtonLoader(false);
            setShowEditModal(false)
            toast.success(response?.message, { duration: 2000 })
        } catch (error) {
            setButtonLoader(false);
            toast.error(error?.message, { duration: 2000 })
        }
    };

    const closeDeleteModal = () => {
        setCurrentDept(null)
        setShowDeleteModal(false)
    };

    const handleEdit = (institute) => {
        setCurrentDept(institute);
        setShowEditModal(true);
    };

    useEffect(() => {
        getList(true);
    }, [selectedOption]);

    const handleDelete = (dept) => {
        setCurrentDept(dept)
        setShowDeleteModal(true)
    };


    console.log("uploads", uploads)

    return screenLoader ? (
        <div className="w-full flex justify-center items-center min-h-[90vh]">
            <Loader extraStyles="!static !bg-transparent" />
        </div>
    ) : (
        <Page
            title="Collegio de Kidapawan Branch"
            containerStyles={`relative !bg-[#EEF2F5] !p-0`}
            headerStyles="px-5 !m-0 !py-2 bg-white"
            enableHeader
        >
            <div className="w-full mb-4 md:mb-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-gray-600 text-sm font-medium uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-gray-600 text-sm font-medium uppercase">Email Address</th>
                                <th className="px-6 py-3 text-left text-gray-600 text-sm font-medium uppercase">Subscription Plan</th>
                                <th className="px-6 py-3 text-center text-gray-600 text-sm font-medium uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uploads.map((upload, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100 transition duration-150`}
                                >
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800 text-sm">
                                        {upload?.user_detail?.name || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800 text-sm">
                                        {upload?.user_detail?.email || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800 text-sm">
                                        {upload?.subscrption_plan_detail?.month || "Invalid"}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-center">
                                        {/* Flexbox container to center buttons */}
                                        <div className="flex justify-center items-center space-x-5">
                                            <button
                                                className={`px-4 py-2 text-sm font-medium rounded-md ${upload?.user_detail?.account_status === "active"
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : "bg-blue-500 hover:bg-blue-600"
                                                    } text-white transition duration-150`}
                                                onClick={() => handleDelete(upload?.user_detail)}
                                            >
                                                {upload?.user_detail?.account_status === "active" ? "InActive" : "Active"}
                                            </button>
                                            <button
                                                className="px-4 py-2 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-150"
                                                onClick={() => handleEdit(upload?.user_detail)}
                                            >
                                                Renew Plan
                                            </button>
                                        </div>
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
                    customMessage={`You want to ${block
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
            {showDeleteModal && (
                <DeleteModal
                    confirmModal={() => handleEditStatus(currentDept.user_id)}
                    isLoading={buttonLoader}
                    delete_name={currentDept?.name}
                    closeModal={closeDeleteModal}
                    customMessage={`Are you sure you want to ${currentDept?.account_status == 'active' ? 'in active' : 'active'} ${currentDept?.name} account?`}
                />
            )}




            {showEditModal && (
                <SubscriptionRenewModal
                    isLoading={buttonLoader}
                    onClose={() => setShowEditModal(false)}
                    show={showEditModal}
                    onSave={handleEditPlan}
                />
            )}

        </Page>
    );
};

export default Subscription;
