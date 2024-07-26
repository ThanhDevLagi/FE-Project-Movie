import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/AuthContext';
import { fetchFavoriteMovies, deleteFavoriteMovie } from '../Redux/favoriteSlice';
import MovieLoadingSkeletons from '../components/Loading/MovieLoadingSkeletons';
import MovieFavorites from '../components/MovieList/MovieFavorites';

const FavoritesMovies = () => {
    const dispatch = useDispatch();
    const favoriteMovies = useSelector((state) => state.favorite.items);
    const { user, isLoading } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            dispatch(fetchFavoriteMovies(user.id))
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }
    }, [user, dispatch]);

    const handleDelete = (movieId) => {
        if (user) {
            dispatch(deleteFavoriteMovie({ userId: user.id, movieId }));
        }
    };

    if (isLoading || loading) {
        return <MovieLoadingSkeletons count={7} />;
    }

    return (
        <div className='p-4 sm:p-6 lg:p-8 min-h-screen'>
            <h1 className='text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-6'>Danh Sách Các Bộ Phim Yêu Thích</h1>
            {favoriteMovies.length > 0 ? (
                <MovieFavorites MovieList={favoriteMovies} count={6} onDelete={handleDelete} />
            ) : (
                <p className='text-white text-lg'>Bạn chưa có bộ phim yêu thích nào.</p>
            )}
        </div>
    );
};

export default FavoritesMovies;
