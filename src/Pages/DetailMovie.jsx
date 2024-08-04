import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesDetail, getMoviesByCategory } from '../Services/MovieServices';
import MovieDetail from '../components/MovieList/MovieDetail';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import MovieList from '../components/MovieList/MovieList';
import MovieLoadingSkeletons from '../components/Loading/MovieLoadingSkeletons';
import { useAuth } from '../hooks/AuthContext';
import { clearComments, getComments, postComments, postCommentsReply } from '../Redux/commentSlice';
import Comment from '../components/Comments/Comment';

const DetailMovie = () => {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [firstEpisodeSlug, setFirstEpisodeSlug] = useState(null);
    const { user } = useAuth();
    console.log(user)
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.comments);
    const loadingComments = useSelector((state) => state.comments.loading);
    const loading = !movie;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMoviesDetail(slug);
                setMovie(response || null);

                if (response?.category?.[2]?.list) {
                    const categoryName = removeVietnameseTones(response.category[2].list[0].name);
                    const relatedMoviesResponse = await getMoviesByCategory(categoryName);
                    setRelatedMovies(relatedMoviesResponse.items || []);
                }

                dispatch(clearComments());
                dispatch(getComments({ movieSlug: slug }));
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setMovie(null);
                setRelatedMovies([]);
            }
        };

        if (slug) fetchData();
        window.scrollTo(0, 0);
    }, [slug, dispatch]);

    const handleCommentSubmit = useCallback(() => {
        if (!user) return alert('Bạn cần đăng nhập để bình luận');
        if (newComment.trim()) {
            dispatch(postComments({ userId: user.id, userName: user.name, movieSlug: slug, comment: newComment }))
                .then(() => setNewComment(''))
                .catch((error) => console.error('Failed to post comment:', error));
        }
    }, [dispatch, newComment, slug, user]);

    const handleReplySubmit = useCallback((reply, commentId) => {
        if (!user) return alert('Bạn cần đăng nhập để phản hồi');
        if (reply.trim()) {
            dispatch(postCommentsReply({ userId: user.id, userName: user.name, commentId, reply }))
                .then(() => dispatch(getComments({ movieSlug: slug })))
                .catch((error) => console.error('Failed to post reply:', error));
        }
    }, [dispatch, slug, user]);

    useEffect(() => {
        if (movie && movie.episodes) {
            let firstSlug = null;
            movie.episodes.forEach(episodeGroup => {
                episodeGroup.items.forEach(item => {
                    if (!firstSlug && item.slug) {
                        firstSlug = item.slug;
                    }
                });
            });
            setFirstEpisodeSlug(firstSlug);
        }
    }, [movie]);

    return loading ? (
        <div className='flex justify-center items-center h-screen'>
            <div className='loading w-10 h-10 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin'></div>
        </div>
    ) : (
        <div className='container mx-auto p-4 sm:p-6 md:p-8 lg:p-12'>
            {movie ? (
                <>
                    <MovieDetail movie={movie} slug={slug} user={user} firstEpisodeSlug={firstEpisodeSlug} />
                    <div className='mt-6 md:mt-12'>
                        <h3 className='text-lg md:text-2xl text-white font-bold mb-4'>Bình luận:</h3>
                        <div className='py-4 px-4 md:px-6 bg-[#1f1f1f] rounded-lg'>
                            <div className='flex flex-col md:flex-row gap-4 mb-4'>
                                <input
                                    type="text"
                                    className='flex-1 p-2 md:p-4 rounded-lg bg-[#2f2f2f] text-white text-xs md:text-base'
                                    placeholder='Viết bình luận của bạn...'
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button
                                    className={`bg-blue-500 text-white px-4 py-2 rounded-md ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={handleCommentSubmit}
                                    disabled={!user}
                                >
                                    Gửi
                                </button>
                            </div>
                            {loadingComments ? (
                                <div className='flex justify-center items-center h-screen'>
                                    <div className='loading w-6 h-6 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin'></div>
                                </div>
                            ) : (
                                comments.length === 0 ? (
                                    <p className='text-white text-base md:text-lg'>Chưa có bình luận nào cho bộ phim này.</p>
                                ) : (
                                    comments.map((comment) => (
                                        <Comment
                                            key={comment._id}
                                            comment={comment}
                                            onReplySubmit={(reply) => handleReplySubmit(reply, comment._id)}
                                        />
                                    ))
                                )
                            )}
                        </div>
                    </div>
                    <div className='mt-6 md:mt-12'>
                        <SectionTitle title='Bạn có thể thích' />
                        {renderMovieListOrSkeleton(relatedMovies, MovieList, 7)}
                    </div>
                </>
            ) : (
                <div className='h-96 flex items-center justify-center'>
                    <h1 className='text-2xl md:text-4xl text-white font-medium text-center'>Phim này chưa cập nhật</h1>
                </div>
            )}
        </div>
    );
};

const removeVietnameseTones = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/\s+/g, '-').toLowerCase();
};

const renderMovieListOrSkeleton = (movies, Component, skeletonCount) => (
    movies && movies.length > 0 ? <Component MovieList={movies} count={6} /> : <MovieLoadingSkeletons count={skeletonCount} />
);

export default DetailMovie;
