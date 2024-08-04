import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from "react-icons/fa";
import { deleteMovie } from '../../Redux/moviesSlice';

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

const MovieListAdmin = ({ data, count }) => {
    const dispatch = useDispatch();
    const gridCols = getGridCols(count);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bộ phim này?')) {
            dispatch(deleteMovie(id));
        }
    };

    return (
        <div className={`grid grid-cols-${gridCols.base} sm:grid-cols-${gridCols.sm} md:grid-cols-${gridCols.md} lg:grid-cols-${gridCols.lg} xl:grid-cols-${gridCols.xl} gap-6`}>
            {data.length > 0 && data.map((item) => (
                <div 
                    key={item._id} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative"
                >
                    <Link 
                        to={`/admin/movie/${item._id}`} 
                        className="block"
                    >
                        <div className="relative">
                            <img 
                                src={item.poster_url} 
                                className="w-full h-48 object-cover" 
                                alt="Movie Thumbnail" 
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                                <h3 className="text-lg font-semibold text-white truncate">{item.name}</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-gray-600 flex flex-col gap-2">
                                <span className="block text-sm font-semibold">Thể loại:</span>
                                <div className='flex flex-wrap'>
                                    {item.categories && Object.values(item.categories).map((categoryGroup, i) => (
                                        <React.Fragment key={i}>
                                            {categoryGroup.list.map((category) => (
                                                <span 
                                                    key={category._id} 
                                                    className="bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-3 py-1 mr-2 mb-2"
                                                >
                                                    {category.name}
                                                </span>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2 text-gray-600">
                                <span className="block text-sm font-semibold">Thời gian:</span>
                                <span className="block text-sm text-gray-500">{item.time}</span>
                            </div>
                        </div>
                    </Link>
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
                    >
                        <FaTrashAlt className="text-xl" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MovieListAdmin;
