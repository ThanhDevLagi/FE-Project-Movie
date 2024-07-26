import React from 'react';

const Spinner = ({text}) => (
    <div className="flex items-center justify-center">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-teal-500 font-semibold text-sm">{text}...</p>
            </div>
        </div>
    </div>
);

export default Spinner;
