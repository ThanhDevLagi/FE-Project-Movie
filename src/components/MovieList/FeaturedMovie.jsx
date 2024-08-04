import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedMovie = ({ data }) => (
    <div className='relative p-4 bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-lg mb-8 flex flex-col gap-6 md:gap-6 md:flex-row items-center'>
        <div className='absolute inset-0 bg-cover bg-center filter blur-lg opacity-50 rounded-lg' style={{ backgroundImage: `url(${data.poster_url ? data.poster_url : data.thumb_url})` }}></div>
        <Link to={`/phim/${data.slug}`} className='relative w-full md:w-1/2 md:ml-auto z-10'>
            <img loading='lazy' src={data.poster_url} className='w-full h-auto object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105' alt={data.name} />
        </Link>
        <div className='relative w-full md:w-1/2 flex flex-col justify-center z-10 p-4'>
            <h2 className='text-xl md:text-3xl font-bold text-white mb-2 md:mb-4'>{data.name}</h2>
            <h3 className='text-sm md:text-xl font-semibold text-white mb-2'>{data.quality} - {data.language}</h3>
            <p className='text-gray-300 text-base mb-4 md:max-w-lg'>{data.description}</p>
            <div className='flex flex-wrap gap-4'>
                <Link to={`/phim/${data.slug}`} className='px-4 py-2 bg-green-theme text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition duration-300'>Xem Ngay</Link>
                <button className='px-4 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-500 transition duration-300'>Thêm vào Danh Sách</button>
            </div>
        </div>
        
    </div>
);

export default FeaturedMovie;
