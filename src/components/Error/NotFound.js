
import React from 'react';

const NotFound = ({ text, removeBorder }) => {
    return (
        <tr>
            <td colSpan="3" className={`px-4 py-2 ${!removeBorder && 'border'} text-center`}>
                {text || 'data not found!'}
            </td>
        </tr>
    );
};

export default NotFound;
