import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorPopup from '../Popup/ErrorPopup';
import SuccessPopup from '../Popup/SuccessPopup';
import RemoveSuccessPopup from '../Popup/RemoveSuccessPopup';
import { addFavoriteMovie, deleteFavoriteMovie, fetchFavoriteMovies } from '../../Redux/favoriteSlice';

const removeVietnameseTones = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/\s+/g, '-').toLowerCase();
};

const MovieDetail = ({ movie, slug, firstEpisodeSlug, user }) => {
    const dispatch = useDispatch();
    const favoriteMovies = useSelector((state) => state.favorite.items);
    const [serverError, setServerError] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showRemoveSuccessPopup, setShowRemoveSuccessPopup] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    
    useEffect(() => {
        if (user) {
            dispatch(fetchFavoriteMovies(user.id));
        }
    }, [user, dispatch]);
    
    useEffect(() => {
        if (favoriteMovies && movie) {
            setIsFavorite(favoriteMovies.some(favoriteMovie => favoriteMovie.id === movie.id));
        }
    }, [favoriteMovies, movie]);

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
        setShowRemoveSuccessPopup(false); 
    };

    const handleAddFavorite = async () => {
        if (user) {
            try {
                await dispatch(addFavoriteMovie({ userId: user.id, movie })).unwrap();
                setShowSuccessPopup(true);
            } catch (error) {
                setServerError(error.message || "Có lỗi khi thêm vào danh sách yêu thích");
                setShowErrorPopup(true);
            }
        } else {
            setServerError("Bạn cần đăng nhập để thêm bộ phim vào danh sách yêu thích");
            setShowErrorPopup(true);
        }
    };

    const handleRemoveFavorite = async () => {
        if (user) {
            try {
                await dispatch(deleteFavoriteMovie({ userId: user.id, movieId: movie.id })).unwrap();
                setShowRemoveSuccessPopup(true);
            } catch (error) {
                setServerError(error.message || "Có lỗi khi xóa khỏi danh sách yêu thích");
                setShowErrorPopup(true);
            }
        } else {
            setServerError("Bạn cần đăng nhập để xóa bộ phim khỏi danh sách yêu thích");
            setShowErrorPopup(true);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-8 flex flex-col md:flex-row gap-8 rounded-lg">
            {showSuccessPopup && <SuccessPopup message="Đã thêm bộ phim yêu thích thành công" onClose={handlePopupClose} />}
            {showErrorPopup && <ErrorPopup message={serverError} onClose={handlePopupClose} />}
            {showRemoveSuccessPopup && <RemoveSuccessPopup message="Đã xóa khỏi danh sách yêu thích" onClose={handlePopupClose} />}
            
            <div className='w-full h-auto md:w-1/3'>
                <img
                    loading='lazy'
                    src={movie.thumb_url || movie.poster_url || '/pictures/ImageNotFound.png'}
                    className='w-full h-full object-cover rounded-lg shadow-lg'
                    alt={movie.name}
                />
            </div>

            <div className='w-full md:w-2/3 flex flex-col gap-4'>
                <h1 className="text-2xl text-white font-bold">{`${movie.name} - ${movie.original_name}`}</h1>
                <h1 className='text-lg text-white font-semibold'>{`${movie.quality} - ${movie.language}`}</h1>

                <div className='flex flex-wrap gap-2 w-full'>
                    {movie.category && Object.values(movie.category).map((categoryGroup) => (
                        <div key={categoryGroup.group.id}>
                            <div className='flex flex-wrap gap-1 w-full'>
                                {categoryGroup.list.map((categoryItem) => {
                                    let categoryName = removeVietnameseTones(categoryItem.name === 'Phim 18+' ? 'phim-18' : categoryItem.name);
                                    return (
                                        <Link
                                            key={categoryItem.id}
                                            to={`/phim/the-loai/${categoryName}`}
                                            className='rounded-lg bg-green-theme px-2 py-1 text-base text-white font-semibold hover:bg-opacity-80'
                                        >
                                            {categoryItem.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <span className='text-lg text-white font-semibold'>{`${movie.current_episode} / ${movie.total_episodes || "???"}`}</span>

                <div className='flex gap-2'>
                    <span className='text-gray-400 text-lg'>Thời gian: </span>
                    <p className='text-gray-300 text-lg'>{movie.time === "0 phút" ? "Đang cập nhật" : movie.time}</p>
                </div>

                <p className='text-gray-400 text-base'>{movie.description || 'No description available'}</p>

                <div className='flex gap-2'>
                    <span className='text-gray-400 text-base w-fit'>Đạo diễn: </span>
                    <p className='text-gray-300 text-base'>{movie.director || "Đang cập nhật"}</p>
                </div>

                <span className='text-gray-400 text-base w-fit'>Diễn viên: <p className='text-gray-300 text-base'>{movie.casts || "Đang cập nhật"}</p></span>

                <div className='flex gap-4'>
                    {firstEpisodeSlug && (
                        <Link to={`/phim/${slug}/watch/${firstEpisodeSlug}`} className='px-6 py-3  text-white font-semibold rounded-lg shadow-md hover:bg-green-theme border-2 border-white transition duration-300'>
                            Xem Ngay
                        </Link>
                    )}
                    <button
                        onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
                        className={`px-6 py-3 ${isFavorite ? 'bg-green-theme' : 'bg-gray-700'} text-white font-semibold rounded-lg shadow-md transition duration-300`}
                        style={{ minWidth: "fit-content" }}
                    >
                        {isFavorite ? 'Đã lưu yêu thích' : 'Thêm vào danh sách'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
