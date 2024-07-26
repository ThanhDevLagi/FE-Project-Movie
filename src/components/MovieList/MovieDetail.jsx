import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFavoriteMovie, fetchFavoriteMovies } from '../../Redux/favoriteSlice';
import SuccessPopup from '../Popup/SuccessPopup';
import ErrorPopup from '../Popup/ErrorPopup';

const removeVietnameseTones = (str) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    str = str.replace(/\s+/g, '-').toLowerCase();
    return str;
};

const MovieDetail = ({ movie, slug, firstEpisodeSlug, user }) => {
    const dispatch = useDispatch();
    const favoriteMovies = useSelector((state) => state.favorite.items);
    const [serverError, setServerError] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(fetchFavoriteMovies(user.id));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (favoriteMovies && movie) {
            setIsFavorite(favoriteMovies.some(favoriteMovie => favoriteMovie.slug === movie.slug));
        }
    }, [favoriteMovies, movie]);

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        setShowErrorPopup(false);
    };

    const handleAddFavorite = async () => {
        if (user) {
            try {
                const resultAction = dispatch(addFavoriteMovie({ userId: user.id, movie }));
                if (addFavoriteMovie.rejected.match(resultAction)) {
                    setServerError(resultAction.payload?.message || "Có lỗi khi thêm vào danh sách yêu thích");
                    setShowErrorPopup(true);
                } else {
                    setShowSuccessPopup(true);
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                setServerError("Có lỗi không mong muốn xảy ra");
                setShowErrorPopup(true);
            }
        } else {
            setServerError("Bạn cần đăng nhập để thêm bộ phim vào danh sách yêu thích");
            setShowErrorPopup(true);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-8 flex flex-col md:flex-row gap-8 rounded-lg">
            {showSuccessPopup && (
                <SuccessPopup message="Đã thêm bộ phim yêu thích thành công" onClose={handlePopupClose} />
            )}
            {showErrorPopup && (
                <ErrorPopup message={serverError} onClose={handlePopupClose} />
            )}
            {/* Poster */}
            <div className='w-full h-auto md:w-1/3'>
                <img
                    loading='lazy'
                    src={movie.thumb_url || movie.poster_url || '/pictures/ImageNotFound.png'}
                    className='w-full h-full object-cover rounded-lg shadow-lg'
                    alt={movie.name}
                />
            </div>

            {/* Details */}
            <div className='w-full md:w-2/3 flex flex-col gap-4'>
                <h1 className="text-2xl text-white font-bold">{`${movie.name} - ${movie.original_name}`}</h1>
                <h1 className='text-lg text-white font-semibold'>{`${movie.quality} - ${movie.language}`}</h1>

                {/* Categories */}
                <div className='flex flex-wrap gap-2 w-full'>
                    {movie.category && Object.values(movie.category).map((categoryGroup) => (
                        <div key={categoryGroup.group.id}>
                            <div className='flex flex-wrap gap-1 w-full'>
                                {categoryGroup.list.map((categoryItem) => {
                                    let categoryName = categoryItem.name;
                                    if (categoryName === 'Phim 18+') {
                                        categoryName = 'phim-18';
                                    } else {
                                        categoryName = removeVietnameseTones(categoryName);
                                    }
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

                {/* Current Episode */}
                <span className='text-lg text-white font-semibold'>{`${movie.current_episode} / ${movie.total_episodes || "???"}`}</span>

                {/* Time */}
                <div className='flex gap-2'>
                    <span className='text-gray-400 text-lg'>Thời gian: </span>
                    <p className='text-gray-300 text-lg'>{movie.time === "0 phút" ? "Đang cập nhật" : movie.time}</p>
                </div>

                {/* Description */}
                <p className='text-gray-400 text-base'>{movie.description || 'No description available'}</p>

                {/* Director */}
                <div className='flex gap-2'>
                    <span className='text-gray-400 text-base w-fit'>Đạo diễn: </span>
                    <p className='text-gray-300 text-base'>{movie.director || "Đang cập nhật"}</p>
                </div>

                {/* Casts */}
                <span className='text-gray-400 text-base w-fit'>Diễn viên: <p className='text-gray-300 text-base'>{movie.casts || "Đang cập nhật"}</p></span>

                {/* Action Buttons */}
                <div className='flex gap-4'>
                    {firstEpisodeSlug && (
                        <Link to={`/phim/${slug}/watch/${firstEpisodeSlug}`} className='px-6 py-3 hover:bg-green-theme text-white font-semibold rounded-lg border-2 hover:border-teal-500 border-white shadow-md transition duration-300'>
                            Xem Ngay
                        </Link>
                    )}
                    <button
                        onClick={handleAddFavorite}
                        className={`px-6 py-3 ${isFavorite ? 'bg-green-theme' : 'bg-gray-700'} text-white font-semibold rounded-lg shadow-md hover:${isFavorite ? 'bg-green-400' : 'bg-gray-600'} transition duration-300`}
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
