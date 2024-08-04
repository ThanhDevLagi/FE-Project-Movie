import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LoadingSkeleton from '../components/Loading/LoadingSkeleton';

const getMovies = async (page) => {
    try {
        const response = await axios.get(`https://be-project-movie.onrender.com/api/films/phim-moi-cap-nhat?page=${page}`);
        return response.data.items || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const Movie = () => {
    const { slug } = useParams();
    const [movies, setMovies] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Thêm state để kiểm tra dữ liệu đã kết thúc hay chưa

    const handleLoadMore = useRef(null);

    // Sử dụng useRef để kiểm tra lần đầu render
    const isFirstRender = useRef(true);

    handleLoadMore.current = async () => {
        setLoading(true);
        try {
            const loadedMovies = await getMovies(nextPage);
            // Kiểm tra dữ liệu trùng lặp
            const uniqueMovies = filterUniqueMovies([...movies, ...loadedMovies]);
            setMovies(uniqueMovies);
            setNextPage(prevPage => prevPage + 1);
            // Kiểm tra nếu không còn dữ liệu nữa
            if (loadedMovies.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const filterUniqueMovies = (newMovies) => {
        // Sử dụng Set để loại bỏ các phim trùng lặp
        const movieSet = new Set();
        const uniqueMovies = [];
        newMovies.forEach(movie => {
            if (!movieSet.has(movie.slug)) {
                movieSet.add(movie.slug);
                uniqueMovies.push(movie);
            }
        });
        return uniqueMovies;
    };

    useEffect(() => {
        // Kiểm tra nếu là lần render đầu tiên
        if (isFirstRender.current) {
            isFirstRender.current = false;
            handleLoadMore.current();
        }
        window.scrollTo(0, 0);
    }, [slug]);

    // Thêm sự kiện cuộn trang để tải thêm phim khi cần thiết
    useEffect(() => {
        const handleScroll = () => {
            // Nếu đang loading hoặc đã hết dữ liệu thì không làm gì
            if (loading || !hasMore) return;

            // Tính toán chiều cao của document và chiều cao từ đầu đến cuối trang
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Nếu người dùng cuộn đến cuối trang thì tự động load thêm
            if (windowHeight + scrollTop >= documentHeight - 200) {
                handleLoadMore.current();
            }
        };

        // Lắng nghe sự kiện scroll
        window.addEventListener('scroll', handleScroll);

        // Cleanup để tránh memory leak
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    return (
        <div className='bg-gradient-to-b from-gray-800 to-black min-h-screen px-8 py-9 text-white'>
            <h1 className='text-3xl font-bold mb-8'>Phim Mới & Phổ biến</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
                {movies.length > 0 && movies.map((item, index) => (
                    <Link to={`/phim/${item.slug}`} key={index} className='relative group'>
                        <img
                            loading='lazy'
                            src={item.thumb_url || item.poster_url || "/pictures/ImageNotFound.png"}
                            className='w-full h-80 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-110'
                            alt={item.name}
                        />
                    </Link>
                ))}
                {loading && (
                    [...Array(6)].map((_, index) => (
                        <MovieItemLoading key={index} />
                    ))
                )}
            </div>
            <div className='flex justify-center mt-8'>
                {loading ? (
                    <button className='px-6 py-3 bg-green-theme text-white font-bold rounded-lg shadow-md' disabled>
                        Đang tải...
                    </button>
                ) : (
                    <button
                        className='px-6 py-3 bg-green-theme text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition duration-300'
                        onClick={handleLoadMore.current}
                    >
                        Tải thêm
                    </button>
                )}
            </div>
        </div>
    );
};

const MovieItemLoading = () => {
    return (
        <div className='w-full h-72'>
            <LoadingSkeleton width="100%" height="100%" radius="16px" />
        </div>
    );
};

export default Movie;
