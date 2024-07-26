import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const SuccessPopup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 popup-zoom">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-sm w-full hover:scale-105">
                <div className="bg-green-500 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className='flex gap-2'>
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className='text-base font-medium text-white'>Thành công rồi nhé!</span>
                        </div>

                        <button onClick={onClose} className="text-white">
                            <span className="sr-only">Đóng</span>
                            <FontAwesomeIcon icon={faTimesCircle} className="text-white cursor-pointer" onClick={onClose} />
                        </button>
                    </div>
                </div>
                <div className="bg-white px-4 py-5">
                    <p className="text-lg text-gray-800">{message}</p>
                    <div className="mt-5 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:bg-teal-700"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPopup;
