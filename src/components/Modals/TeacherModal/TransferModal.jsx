import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { call } from '../../../utils/helper';

const TransferModal = ({ isOpen, onClose, onPress, item, user_id, loader }) => {
  const [selectUser, setSelectUser] = useState('');
  const [roleId, setRoleId] = useState(item?.role_id);

  const [amount, setAmount] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [loaderr, setLoader] = React.useState(false);

  const handleSubmit = async () => {
    if (!selectUser) {
      toast.error("Please select a user", { duration: 2000 });
    } else if (!amount) {
      toast.error("Amount is required", { duration: 2000 });
    } else {
      await onPress(selectUser, amount)
      setAmount('')
      setUsers('')
      setRoleId('')
    }
    console.log('selectUser ,amount ', selectUser, amount)
  };



  const getUsers = async (listLoader) => {
    try {
      listLoader && setLoader(true)
      const formData = new FormData();
      formData.append('role_id', (roleId || item?.role_id).toString());
      const response = await call('/app/fetch_users_list', 'POST', formData)
      setUsers(response?.data || [])
      listLoader && setLoader(false)
    } catch (error) {
      setUsers([])
      listLoader && setLoader(false)
      toast.error(error?.message, { duration: 2000 });
    }
  };


  // useEffect(() => {
  //   getUsers(true)
  // }, [item])

  useEffect(() => {
    getUsers()
  }, [roleId])



  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Transfer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="mb-4">

          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="3">Student</option>
            <option value="4">Teacher</option>
          </select>
        </div>
        <div className="mb-4">

          <select
            value={selectUser}
            onChange={(e) => setSelectUser(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {users.map((item, index) => {
              return (
                <option value={item.id}>{item.value}</option>
              )
            })}
          </select>
        </div>
        <div className="mt-2 w-full text-center">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex justify-center space-x-2 mt-3">
          <button
            type="button"
            className={`${loader ? 'opacity-50' : 'opacity-100'} w-6/12 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center`}
            onClick={handleSubmit}
          >
            {loader ? "Load" : "Submit"}
          </button>

          <button
            type="button"
            className="w-6/12 px-2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default TransferModal;