import React from 'react';
import { formatDateState } from '../../../utils/helper';

const transactions = [
  { id: 1, date: '21 March 2021', invoiceId: 'OP01214784', amount: '$250 USD', status: 'Receive', action: 'Details' },
  { id: 2, date: '20 March 2021', invoiceId: 'OP01214784', amount: '-$20 USD', status: 'Transfer', action: 'Details' },
  { id: 3, date: '19 March 2021', invoiceId: 'OP67452148', amount: '-$80 USD', status: 'Receive', action: 'Details' },

];

const TransactionModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-4xl h-1/2 p-8 shadow-lg relative overflow-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold text-gray-800">Transactions</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction type</th>
              <th className="px-6 py-3 text-center text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 text-center whitespace-nowrap">{formatDateState(transaction.created_at)}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{transaction.transaction_ref_id}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{transaction.transaction_type}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionModal;
