import React from 'react';

const LoadingSpin = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='loading w-10 h-10 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin'></div>
        </div>
    );
};

export default LoadingSpin;