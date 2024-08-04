// RemoveSuccessPopup.js
import React from 'react';

const RemoveSuccessPopup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold">{message}</h2>
                <button 
                    onClick={onClose} 
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default RemoveSuccessPopup;
