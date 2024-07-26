import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-black text-white'>
            <h1 className='text-3xl md:text-5xl font-bold text-center mb-6'>Oops! Trang này không tồn tại.</h1>
            <p className='text-lg md:text-xl text-center mb-10'>Hình như bạn đã đi lạc đường rồi. Hãy quay về <Link to="/" className='text-blue-500 hover:underline'>trang chủ</Link>.</p>
            <img loading='lazy' src="/pictures/notFounded.png" className='w-80 md:w-96 h-80 md:h-96 object-cover rounded-lg shadow-lg mb-10' alt="notFound" />
            <p className='text-sm md:text-base text-center'>404 NOT FOUND</p>
        </div>
    );
};

export default NotFound;
    