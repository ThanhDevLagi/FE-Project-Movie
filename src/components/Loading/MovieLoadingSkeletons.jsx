import React from 'react';

const MovieLoadingSkeletons = ({ count }) => (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12'>
        {[...Array(count)].map((_, index) => (
            <div key={index} className='relative w-full h-72 overflow-hidden rounded-lg shadow-lg bg-gray-700 animate-pulse'>
                <div className='absolute inset-0 bg-gray-800 opacity-75'></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center space-y-2 px-4 py-6'>
                    <div className='w-1/2 h-2 bg-gray-600 rounded'></div>
                    <div className='w-full h-48 bg-gray-600 rounded'></div>
                    <div className='w-1/3 h-2 bg-gray-600 rounded'></div>
                </div>
            </div>
        ))}
    </div>
);

export default MovieLoadingSkeletons;