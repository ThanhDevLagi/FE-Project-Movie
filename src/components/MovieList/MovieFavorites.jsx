import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const getGridCols = (count) => {
    if (count >= 7) {
        return {
            base: 2,
            sm: 3,
            md: 4,
            lg: 5,
            xl: 7
        };
    } else if (count >= 5) {
        return {
            base: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 6
        };
    } else {
        return {
            base: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: count
        };
    }
};

const MovieFavorites = ({ MovieList, count, onDelete }) => {
    const gridCols = getGridCols(count);
    return (
        <div className={`scroll-animation grid grid-cols-${gridCols.base} sm:grid-cols-${gridCols.sm} md:grid-cols-${gridCols.md} lg:grid-cols-${gridCols.lg} xl:grid-cols-${gridCols.xl} gap-4 mb-12`}>
            {MovieList.slice(0, count).map((item) => (
                <div key={item.id} className='relative w-full h-auto overflow-hidden rounded-lg shadow-lg'>
                    <Link to={`/phim/${item.slug}`} className='block'>
                        <img src={item.thumb_url || "/pictures/ImageNotFound.png"} className='w-full h-full object-cover transform transition-transform duration-300 hover:scale-110' alt={item.name} />
                        <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-45 p-2'>
                            <h2 className='text-center text-lg font-semibold text-white'>{item.name}</h2>
                        </div>
                    </Link>
                    <div className='absolute top-1 right-1 p-2 rounded-full bg-green-theme w-10 h-10 text-center'>
                        <button
                            className='text-white font-medium text-base hover:text-red-600 transition-all'
                            onClick={(e) => {
                                e.stopPropagation(); 
                                onDelete(item.id);
                            }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieFavorites;
