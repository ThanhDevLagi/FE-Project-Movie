import React from 'react';
import { Link } from 'react-router-dom';

const SectionTitle = ({ title, link }) => (
    <div className='flex justify-between'>
        <h1 className='text-2xl text-white font-bold mb-8 min-w-fit'>{title}</h1>
        <Link to={link} className='px-2 py-3 bg-green-theme text-white font-bold rounded-lg shadow-md transition duration-300 min-w-fit h-fit'>Xem tất cả</Link>
    </div>
);

export default SectionTitle;