import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedMovie = ({ data }) => (
    <div className='relative p-8 bg-gradient-to-b  from-gray-800  to-black rounded-lg shadow-lg mb-12 flex flex-col-reverse gap-10 md:gap-6 md:flex-row items-center md:items-start'>
        <div className='absolute inset-0 bg-cover bg-center filter blur-lg opacity-50 rounded-lg' style={{ backgroundImage: `url(${data.poster_url ? data.poster_url : data.thumb_url})` }}></div>
        <div className='relative w-full md:w-1/2 flex flex-col justify-center z-10 transition-all gap-1'>
            <h2 className='text-2xl md:text-4xl font-bold text-white mb-4'>{data.name}</h2>
            <h2 className='text-base md:text-2xl font-bold text-white mb-4'>{data.quality} - {data.language}</h2>
            <p className='text-gray-300 text-lg mb-6 max-w-[40rem] description-banner min-w-fit'>{data.description}</p>
            <div className='flex space-x-4'>
                <Link to={`/phim/${data.slug}`} className='px-6 py-3 bg-green-theme text-white font-bold rounded-lg shadow-md hover:bg-blue-500 transition duration-300  min-w-fit'>Xem Ngay</Link>
                <button className='px-6 py-3 bg-grey-theme text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition duration-300 min-w-fit'>Thêm vào Danh Sách</button>
            </div>
        </div>
        <Link to={`/phim/${data.slug}`} className='relative w-[400px] h-auto md:w-1/2 md:h-96 md:ml-auto  z-10'>
            <img loading='lazy' src={data.poster_url} className='w-full h-full object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105' alt={data.name} />
        </Link>
    </div>
);

export default FeaturedMovie;