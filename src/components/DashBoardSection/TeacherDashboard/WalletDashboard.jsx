import React, { useEffect, useState } from 'react';
import RechargeModal from '../../Modals/TeacherModal/RechargeModal';
import WithdrawModal from '../../Modals/TeacherModal/WithdrawModal';
import TransferModal from '../../Modals/TeacherModal/TransferModal';
import TransactionModal from '../../Modals/TeacherModal/TransectionModal';
import { call, toFixedMethod } from '../../../utils/helper';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';

const WalletDashboard = ({ item }) => {
  const [loader, setLoader] = useState(false);
  const [walletHandler, setWalletHandler] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [balance, setBalance] = useState('');
  const [transactionList, setTransactionList] = useState([]);

  const handleRecharge = async (amount) => {
    try {
      setWalletHandler(true)
      const formData = new FormData();
      formData.append('user_id', (item?.user_id).toString());
      formData.append('amount', amount);
      formData.append('is_admin', true);
      formData.append('recharge', true);
      const response = await call('/app/edit_wallet_topup', 'POST', formData)
      console.log('response ========================>', response)
      await getWallet()
      setWalletHandler(false)
      setIsRechargeModalOpen(false)
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      toast.error(error?.message, { duration: 2000 });
      setWalletHandler(false)
    }
  };

  const handleTransfer = async (opposite_user_id, amount) => {
    console.log('opposite_user_id, amount', opposite_user_id, amount)
    if (item?.user_id) {
      try {
        setWalletHandler(true)
        const formData = new FormData();
        formData.append('user_id', (item?.user_id).toString());
        formData.append('opposite_user_id', opposite_user_id);
        formData.append('amount', amount);
        formData.append('is_admin', true);
        formData.append('transfer', true);
        const response = await call('/app/edit_wallet_topup', 'POST', formData)
        await getWallet()
        setWalletHandler(false)
        setIsTransferModalOpen(false)
        toast.success(response?.message, { duration: 2000 });
      } catch (error) {
        toast.error(error?.message, { duration: 2000 });
        setWalletHandler(false)
      }
    }
  };

  const handleWithdraw = async (amount) => {
    if (item?.user_id) {
      try {
        setWalletHandler(true)
        const formData = new FormData();
        formData.append('user_id', (item?.user_id).toString());
        formData.append('amount', amount);
        formData.append('is_admin', true);
        formData.append('withdraw', true);
        const response = await call('/app/edit_wallet_topup', 'POST', formData)
        await getWallet()
        setWalletHandler(false)
        setIsWithdrawModalOpen(false)
        toast.success(response?.message, { duration: 2000 });
      } catch (error) {
        toast.error(error?.message, { duration: 2000 });
        setWalletHandler(false)
      }
    }
  };

  const getWallet = async (listLoader) => {
    if (item?.user_id) {
      try {
        listLoader && setLoader(true)
        const formData = new FormData();
        formData.append('user_id', (item?.user_id).toString());
        const response = await call('/app/fetch_transaction_list', 'POST', formData)
        console.log('response', response?.data[0]?.amount)
        setBalance(toFixedMethod(response?.data[0]?.amount))
        setTransactionList(response?.data?.[0]?.transactions || [])
        listLoader && setLoader(false)
      } catch (error) {
        setBalance(toFixedMethod(0))
        setTransactionList([])
        listLoader && setLoader(false)
        toast.error(error?.message, { duration: 2000 });
      }
    }
  };


  useEffect(() => {
    getWallet(true)
  }, [item])


  return (
    <div className="bg-white rounded p-6 mt-6 w-full sm:w-64">
      <h2 className="text-xl font-semibold mb-4">Wallet Dashboard</h2>
      {loader ?
        <Loader extraStyles="!static !bg-transparent" /> :

        <>
          <div className="mb-2 flex items-center">
            <label className="block font-semibold mr-2">Balance:</label>
            <input
              type="text"
              className="w-200 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              value={balance}
              readOnly
            />
          </div>
          {/* <div className="mb-2 flex items-center">
        <label className="block font-semibold mr-2">Total Points:</label>
        <input
          type="text"
          className="w-20 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
          value="850"
          readOnly
        />
      </div> */}
          <div className="mb-2 flex items-center">
            <button
              className="px-2 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setIsRechargeModalOpen(true)}
            >
              Recharge
            </button>
          </div>
          <div className="mb-2 flex items-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setIsTransferModalOpen(true)}
            >
              Transfer
            </button>
          </div>
          <div className="mb-2 flex items-center">
            <button
              className="px-3 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setIsWithdrawModalOpen(true)}
            >
              Withdraw
            </button>
          </div>
          <div className="mb-2 flex items-center">
            <button
              className="px-3 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setIsTransactionModalOpen(true)}
            >
              Transaction History
            </button>
          </div>
        </>
      }


      <RechargeModal
        item={item}
        user_id={item?.user_id}
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onRecharge={handleRecharge}
        loader={walletHandler}
      />
      <WithdrawModal
        item={item}
        user_id={item?.user_id}
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onPress={handleWithdraw}
        loader={walletHandler}
      />
      <TransferModal
        item={item}
        user_id={item?.user_id}
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onPress={handleTransfer}
        loader={walletHandler}
      />
      <TransactionModal
        item={item}
        user_id={item?.user_id}
        data={transactionList}
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      // onPress={handleTransfer}
      // loader={walletHandler}
      />
    </div>
  );
};

export default WalletDashboard;
