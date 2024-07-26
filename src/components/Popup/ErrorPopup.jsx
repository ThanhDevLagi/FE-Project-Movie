import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorPopup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 popup-zoom ">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-sm w-full hover:scale-105">
                <div className="bg-red-500 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <span className="text-white font-bold">Ôi không!. hình như bạn đã gặp một số lỗi</span>
                        <FontAwesomeIcon icon={faTimesCircle} className="text-white cursor-pointer" onClick={onClose} />
                    </div>
                </div>
                <div className="bg-white px-4 py-5">
                    <p className="text-lg text-gray-800">{message}</p>
                    <div className="mt-5 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPopup;
