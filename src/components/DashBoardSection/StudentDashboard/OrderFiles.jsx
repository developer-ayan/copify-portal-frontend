import React, { useEffect, useState } from 'react';
import SubOptionRadio from './SubOptionsRadio';
import { call } from '../../../utils/helper';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';

const OrderFiles = ({ item , disable }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([])

  const orderFiles = [
    { id: 1, subject: 'Bio203 - Section B' },
    { id: 4, subject: 'Mktg102 - Section A' },
  ];

  const static_data = [
    {
      id: 1,
      value: 'Bio203 - Section B',
      child_data: [
        {
          id: 2,
          value: 'Module 2, 10 pages, 2 copies',
        },
        {
          id: 3,
          value: 'Theory of Life, 8 pages, 1 copy',
        },
      ]
    },
    {
      id: 4,
      value: 'Mktg102 - Section A',
      child_data: [
        {
          id: 5,
          value: 'Case Study 1, 2 pages, 1 copy',
        },
      ]
    }
  ]


  const getOrders = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', Number(item?.user_id));
      const response = await call('/admin/fetch_place_orders', 'POST', formData);
      console.log('response?.data', response?.data)
      setData(response?.data);
    } catch (error) {
      setData([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await getOrders()
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs()
  }, [item])


  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-left">Order Files</h2>
    {loader ? (
      <Loader />
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left text-gray-600">Subject</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((e, index) => (
              <React.Fragment key={index}>
                {e?.subject_files?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center">
                        <label htmlFor={`subscribe-${item.id}`} className="mr-4 font-medium text-gray-800">
                          {item.subject_name}
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label htmlFor={`sub-option-1-${item.id}`} className="mr-4 text-gray-500">
                            {`${item.description}, ${item?.page_number} pages, ${e?.qty || '1'} copy`}
                          </label>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-150">
                          {e.order_status}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
};

export default OrderFiles;
