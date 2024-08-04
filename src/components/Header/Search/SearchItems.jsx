import React from 'react';
import { Link } from 'react-router-dom';

const SearchItems = ({ data }) => {
    return (
        <Link to={`/phim/${data.slug}`} className='flex gap-2 mb-4 items-center' key={data.id}>
            <div className='w-full max-w-[50px] md:w-24'>
                {data.thumb_url ? (
                    <img src={data.thumb_url} alt="item" className='w-full h-full block object-cover rounded' />
                ) : (
                    <img src="/pictures/ImageNotFound.png" alt="item" className='w-full h-full block object-cover rounded' />
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-search text-sm font-normal text-white'>{data.name}</p>
                <p className='text-xs font-medium text-gray-400'>{data.time}</p>
            </div>
        </Link>
    );
};

export default SearchItems;
