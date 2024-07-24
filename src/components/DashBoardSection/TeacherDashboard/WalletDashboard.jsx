import React, { useState } from 'react';
import RechargeModal from '../../Modals/AddNewModal';
import WithdrawModal from '../../Modals/CreateModal';
import TransferModal from '../../Modals/MarkPaidModal';
import TransactionModal from '../../Modals/EditModal';

const WalletDashboard = () => {
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [balance, setBalance] = useState(815);

  const handleRecharge = (amount) => {
    setBalance(balance + parseInt(amount, 10));
  };

  return (
    <div className="bg-white rounded p-6 mt-6 w-full sm:w-64">
      <h2 className="text-xl font-semibold mb-4">Wallet Dashboard</h2>
      <div className="mb-2 flex items-center">
        <label className="block font-semibold mr-2">Balance:</label>
        <input
          type="text"
          className="w-20 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
          value={balance}
          readOnly
        />
      </div>
      <div className="mb-2 flex items-center">
        <label className="block font-semibold mr-2">Total Points:</label>
        <input
          type="text"
          className="w-20 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
          value="850"
          readOnly
        />
      </div>
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

      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onRecharge={handleRecharge}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onRecharge={handleRecharge}
      />
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onRecharge={handleRecharge}
      />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      />
    </div>
  );
};

export default WalletDashboard;
