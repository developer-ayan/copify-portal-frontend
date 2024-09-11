import React, { useState } from 'react';

const searchData = ({ data, keyword, handleSubmit }) => {
    return (
        <div className="relative rounded-md min-w-max">
            <div className="bg-white rounded-md p-4">
                <h3 className="font-bold mb-0">Search History</h3>
                <ul className="list-none">
                    {data?.length > 0 ? (
                        data.map((term, index) => (
                            <li
                                onClick={() => handleSubmit(term, term[keyword])}
                                key={index}
                                className="mt-2 py-3 px-5 bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 hover:from-teal-50 hover:via-blue-200 hover:to-indigo-200 text-gray-800 font-semibold shadow-lg hover:shadow-xl cursor-pointer rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                            >
                                <span className="block truncate">{term[keyword]}</span>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No search history available.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default searchData;
