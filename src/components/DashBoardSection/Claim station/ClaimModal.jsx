import React, { useState } from 'react';

const StudentModal = ({ closeModal }) => {
    const [students, setStudents] = useState([
        { id: 1, studentCard: 'CDK000001', studentName: 'Jennifer Smith', claimCode: 'CDK000001' },

    ]);

    const [firstOrder, setFirstOrder] = useState([
        { id: 1, numberOfPage: '5', totalPrice: '66', Status: 'Received' },

    ]);

    const [secondOrder, setSecondOrder] = useState([
        { id: 1, numberOfPage: '5', totalPrice: '66', Status: 'Received' },
    ]);

    const [totalOrder, setTotalOrder] = useState([
        { id: 1, total: '5', amount: '66', Status: 'Paid' },
    ]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
            <div className="bg-white p-6 shadow-md w-full max-w-lg sm:max-w-xl md:max-w-2xl">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Claim</h3>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>


                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white border mb-6">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Student Name</th>
                                <th className="px-4 py-2 border">Student Card</th>
                                <th className="px-4 py-2 border">Claim Number</th>

                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-4 py-2 border text-center">{student.studentName}</td>
                                    <td className="px-4 py-2 border text-center">{student.studentCard}</td>
                                    <td className="px-4 py-2 border text-center">{student.claimCode}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="overflow-x-auto mt-4">
                    <h3 className='text-xl font-semibold text-gray-800'>First Order:</h3>
                    <table className="min-w-full bg-white border mb-6">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Number of Page</th>
                                <th className="px-4 py-2 border">Total Price</th>
                                <th className="px-4 py-2 border">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {firstOrder.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-4 py-2 border text-center">{order.numberOfPage}</td>
                                    <td className="px-4 py-2 border text-center">{order.totalPrice}</td>
                                    <td className="px-4 py-2 border text-center">{order.Status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="overflow-x-auto mt-4">
                    <h3 className='text-xl font-semibold text-gray-800'>Second Order :</h3>
                    <table className="min-w-full bg-white border">

                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Number of Page</th>
                                <th className="px-4 py-2 border">Total Price</th>
                                <th className="px-4 py-2 border">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {secondOrder.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-4 py-2 border text-center">{order.numberOfPage}</td>
                                    <td className="px-4 py-2 border text-center">{order.totalPrice}</td>
                                    <td className="px-4 py-2 border text-center">{order.Status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto mt-4">
                    <h3 className='text-xl font-semibold text-gray-800'>Total :</h3>
                    <table className="min-w-full bg-white border">

                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Overall Total</th>
                                <th className="px-4 py-2 border">Total </th>
                                <th className="px-4 py-2 border">Paid/Unpaid</th>

                            </tr>
                        </thead>
                        <tbody>
                            {totalOrder.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-4 py-2 border text-center">{order.total}</td>
                                    <td className="px-4 py-2 border text-center">{order.amount}</td>
                                    <td className="px-4 py-2 border text-center">{order.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentModal;
