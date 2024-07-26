import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieList/MovieDetail';
import { getMoviesDetail, getMoviesByCategory } from '../Services/MovieServices';
import MovieLoadingSkeletons from '../components/Loading/MovieLoadingSkeletons';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import MovieList from '../components/MovieList/MovieList';
import { useAuth } from '../hooks/AuthContext';

const DetailMovie = () => {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [firstEpisodeSlug, setFirstEpisodeSlug] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMoviesDetail(slug);
                if (response) {
                    setMovie(response);
                    if (response.category && response.category[3] && response.category[3].list) {
                        const categoryName = response.category[3].list[0].name;
                        const formattedCategoryName = removeVietnameseTones(categoryName);
                        const relatedMoviesResponse = await getMoviesByCategory(formattedCategoryName);
                        setRelatedMovies(relatedMoviesResponse.items);
                    }
                }
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setRelatedMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

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

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
            setComments(prevComments => [
                ...prevComments,
                { user: user.name, text: newComment, replies: [] }
            ]);
            setNewComment('');
        }
    };

    const handleReplySubmit = (index, reply) => {
        if (reply.trim() !== '') {
            setComments(prevComments => {
                const updatedComments = [...prevComments];
                updatedComments[index].replies.push({ user: user.name, text: reply });
                return updatedComments;
            });
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='loading w-10 h-10 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin'></div>
            </div>
        );
    }

    return (
        <div className='container mx-auto p-8'>
            {!movie && (
                <div className='h-96 flex items-center justify-center'>
                    <h1 className='text-4xl text-white font-medium text-center'>Phim này chưa cập nhật</h1>
                </div>
            )}
            {movie && (
                <MovieDetail movie={movie} slug={slug} firstEpisodeSlug={firstEpisodeSlug} user={user} />
            )}
            <div className='mt-12'>
                <h3 className='text-2xl text-white font-bold mb-4'>Bình luận:</h3>
                <div className='py-4 px-6 bg-[#1f1f1f] rounded-lg'>
                    <div className='flex gap-4 mb-4'>
                        <input 
                            type="text" 
                            className='flex-1 p-2 rounded-lg bg-[#2f2f2f] text-white' 
                            placeholder='Viết bình luận của bạn...' 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
                        />
                        <button 
                            className='bg-blue-500 text-white px-4 py-2 rounded-md' 
                            onClick={handleCommentSubmit}
                        >
                            Gửi
                        </button>
                    </div>
                    {comments.map((comment, index) => (
                        <Comment 
                            key={index} 
                            comment={comment} 
                            onReplySubmit={(reply) => handleReplySubmit(index, reply)} 
                        />
                    ))}
                </div>
            </div>
            {movie && (
                <div className='mt-12'>
                    <SectionTitle title='Bạn có thể thích' />
                    {renderMovieListOrSkeleton(relatedMovies, MovieList, 7)}
                </div>
            )}
        </div>
    );
};

const Comment = ({ comment, onReplySubmit }) => {
    const [reply, setReply] = useState('');
    const [showReplies, setShowReplies] = useState(false);

    return (
        <div className='bg-[#2f2f2f] p-4 mb-4 rounded-lg'>
            <p className='text-white mb-2'><strong>{comment.user}:</strong> {comment.text}</p>
            {comment.replies.length > 0 && (
                <button 
                    className='text-blue-400 mb-2' 
                    onClick={() => setShowReplies(!showReplies)}
                >
                    {showReplies ? 'Ẩn phản hồi' : `Xem ${comment.replies.length} phản hồi`}
                </button>
            )}
            {showReplies && comment.replies.map((reply, idx) => (
                <div key={idx} className='ml-6 mb-2'>
                    <p className='text-white'><strong>{reply.user}:</strong> {reply.text}</p>
                </div>
            ))}
            <div className='flex gap-4'>
                <input 
                    type="text" 
                    className='flex-1 py-2 px-4 rounded-lg bg-[#3f3f3f] text-white' 
                    placeholder='Viết phản hồi...' 
                    value={reply} 
                    onChange={(e) => setReply(e.target.value)} 
                />
                <button 
                    className='bg-blue-500 text-white px-4 py-2 rounded-md' 
                    onClick={() => onReplySubmit(reply)}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

const renderMovieListOrSkeleton = (movies, Component, skeletonCount) => (
    movies && movies.length > 0 ? <Component MovieList={movies} count={6} /> : <MovieLoadingSkeletons count={skeletonCount} />
);

const removeVietnameseTones = (str) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    str = str.replace(/\s+/g, '-').toLowerCase();
    return str;
};

export default DetailMovie;
