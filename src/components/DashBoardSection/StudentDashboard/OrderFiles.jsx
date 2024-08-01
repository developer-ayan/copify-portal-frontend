import React, { useEffect, useState } from 'react';
import SubOptionRadio from './SubOptionsRadio';

const OrderFiles = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
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

  const handleChange = (_id) => {
    console.log('_id', _id)
    if (selectedIds.includes(_id)) {
      const copyArr = [...selectedIds]
      const removeId = copyArr.filter((item, index) => item != _id)
      setSelectedIds(removeId)
    } else {
      const copyArr = [...selectedIds]
      copyArr.push(_id)

      setSelectedIds(copyArr)
    }
    // setSelectedSubject(fileId);
  };

  const handleUnsubscribe = (subject) => {
    console.log(`Unsubscribe from ${subject}`);
  };

  useEffect(() => {
    setData(static_data)
  }, [selectedIds])

  console.log('copyArr', selectedIds)

  return (
    <div className="bg-white p-5 rounded-lg text-center shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-left">Order Files</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Subject</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`subscribe-${item.id}`}
                        name="subscribe"
                        value={item.value}
                        checked={selectedIds.includes(item.id) ? true : false}
                        onClick={() => handleChange(item.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`subscribe-${item.id}`} className="mr-4">{item.value}</label>
                    </div>
                    {selectedIds.includes(item.id) ? item.child_data?.map((item, index) => {
                      return (
                        <div className="flex items-center justify-between">
                          <div>
                            <input
                              type="radio"
                              id={`sub-option-1-${item.id}`}
                              name={`sub-option-${item.id}`}
                              className="mr-2"
                              onClick={() => console.log('testying')}
                            />
                            <label htmlFor={`sub-option-1-${item.id}`} className="mr-4">{item.value}</label>
                          </div>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded my-2"
                          >
                            Receive
                          </button>
                        </div>
                      )
                    }) : <></>}
                   
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderFiles;
