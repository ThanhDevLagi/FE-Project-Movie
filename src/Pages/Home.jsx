import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeaturedMovie from '../components/MovieList/FeaturedMovie';
import MovieGrid from '../components/MovieList/MovieGrid';
import MovieList from '../components/MovieList/MovieList';
import MovieLoadingSkeletons from '../components/Loading/MovieLoadingSkeletons';
import SectionTitle from '../components/SectionTitle/SectionTitle';

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const getRandomItem = (array) => {
    if (!array || array.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const Home = () => {
    const [data, setData] = useState({
        movieUpdate: [],
        singleMovies: [],
        seriesMovies: [],
        animeMovies: [],
        tvshowMovies: [],
        loading: true
    });

    const fetchData = async () => {
        try {
            const [movieUpdateRes, singleMoviesRes, seriesMoviesRes, animeMoviesRes, tvShowsMoviesRes] = await Promise.all([
                axios.get("https://be-project-movie.onrender.com/api/films/phim-moi-cap-nhat?page=1"),
                axios.get("https://be-project-movie.onrender.com/api/films/phim-le?page=1"),
                axios.get("https://be-project-movie.onrender.com/api/films/phim-bo?page=1"),
                axios.get("https://be-project-movie.onrender.com/api/films/hoat-hinh?page=1"),
                axios.get("https://be-project-movie.onrender.com/api/films/tv-shows?page=1"),
            ]);
            const randomMovie = getRandomItem(movieUpdateRes.data?.items || []);

            setData({
                movieUpdate: movieUpdateRes.data?.items || [],
                singleMovies: shuffleArray(singleMoviesRes.data?.items || []),
                seriesMovies: seriesMoviesRes.data?.items || [],
                animeMovies: shuffleArray(animeMoviesRes.data?.items || []),
                tvshowMovies: tvShowsMoviesRes.data?.items || [],
                randomMovie: randomMovie,
                loading: false
            });

        } catch (error) {
            console.error(error);
            setData(prevData => ({
                ...prevData,
                loading: false
            }));
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className=' flex flex-col bg-gradient-to-b from-gray-800 to-black text-white min-h-screen p-8 '>
            {data.loading ? (
                <MovieLoadingSkeletons count={5} />
            ) : (
                data.movieUpdate.length > 0 && <FeaturedMovie data={data.movieUpdate[0]} />
            )}
            <SectionTitle title='Phim mới cập nhật' link={'/phim-moi-pho-bien'} />
            {renderMovieGridOrSkeleton(data.movieUpdate, MovieGrid, 10)}
            <SectionTitle title='Phim lẻ' link={'/phim/the-loai/phim-le'} />
            {renderMovieListOrSkeleton(data.singleMovies, MovieList, 7)}
            <SectionTitle title='Phim bộ' link={'/phim/the-loai/phim-bo'} />
            {renderMovieListOrSkeleton(data.seriesMovies, MovieList, 7)}
            <SectionTitle title='Phim hoạt hình' link={'/phim/the-loai/hoat-hinh'} />
            {renderMovieListOrSkeleton(data.animeMovies, MovieList, 7)}
            <SectionTitle title='TV Shows' link={'/phim/the-loai/tv-shows'} />
            {renderMovieListOrSkeleton(data.tvshowMovies, MovieList, 7)}
        </div>
    );
};


const renderMovieGridOrSkeleton = (movies, Component, skeletonCount) => (
    movies.length > 0 ? <Component movieUpdate={movies} /> : <MovieLoadingSkeletons count={skeletonCount} />
);

const renderMovieListOrSkeleton = (movies, Component, skeletonCount) => (
    movies.length > 0 ? <Component MovieList={movies} count={6} /> : <MovieLoadingSkeletons count={skeletonCount} />
);

export default Home;
