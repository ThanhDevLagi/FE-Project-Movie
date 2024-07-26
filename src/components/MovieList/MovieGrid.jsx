import React from 'react';
import { Link } from 'react-router-dom';

const MovieGrid =  ({ movieUpdate }) => {
    return (
        <div className='scroll-animation grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12'>
        {movieUpdate.map((item, index) => (
            <Link to={`/phim/${item.slug}`} key={index} className='relative w-full h-60 overflow-hidden rounded-lg shadow-lg'>
                <img loading='lazy' src={item.poster_url || "/pictures/ImageNotFound.png"} className='w-full h-full object-cover transform transition-transform duration-300 hover:scale-110' alt={item.name} />
                <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-45 p-2'>
                    <h2 className='text-center text-lg font-semibold'>{item.name}</h2>
                </div>
            </Link>
        ))}
    </div>
    );
};

export default MovieGrid;
