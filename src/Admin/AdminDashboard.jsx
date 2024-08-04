import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../Redux/moviesSlice';
import MovieListAdmin from './components/MovieListAdmin';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Quản Lý Bộ Phim</h2>
                <Link to={'/admin/addMovie'} className="bg-green-theme hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                    Tạo Bộ Phim
                </Link>
            </div>
            {status === 'loading' && <p className="text-center text-gray-700">Loading...</p>}
            {status === 'failed' && <p className="text-center text-red-500">Error: {error}</p>}
            {movies && movies.length > 0 ? (
                <MovieListAdmin data={movies} count={4} />
            ) : (
                <p className="text-center text-gray-700">Chưa có bộ phim nào</p>
            )}
        </div>
    );
};

export default AdminDashboard;
