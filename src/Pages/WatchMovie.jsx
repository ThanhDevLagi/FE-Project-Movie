import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieEpisodes from '../components/MovieEpisodes/MovieEpisodes';

const WatchMovie = () => {
    const { slug, episode } = useParams();
    const [movie, setMovie] = useState(null);
    const [embedLink, setEmbedLink] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://be-project-movie.onrender.com/api/films/${slug}`);
                setMovie(response.data.movie || null);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    useEffect(() => {
        if (movie && episode) {
            let foundEmbed = null;

            if (episode === 'tap-full' || episode === 'FULL' || episode === 'Full') {
                if (movie.episodes.length === 1 && movie.episodes[0].items.length === 1) {
                    foundEmbed = movie.episodes[0].items[0].embed;
                } else {
                    movie.episodes.forEach(episodeGroup => {
                        episodeGroup.items.forEach(item => {
                            if (!foundEmbed && item.embed) {
                                foundEmbed = item.embed;
                            }
                        });
                    });
                }
            } else {
                movie.episodes.forEach(episodeGroup => {
                    episodeGroup.items.forEach(item => {
                        if (item.slug === episode || item.slug === `tap-${episode}`) {
                            foundEmbed = item.embed || item.m3u8;
                        }
                    });
                });
            }

            setEmbedLink(foundEmbed);
        }
        window.scrollTo(0, 0);

    }, [movie, episode]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='loading w-10 h-10 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin'></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="relative w-full h-0 pb-[56.25%] md:pb-[75%] lg:pb-[48%] bg-black rounded-lg overflow-hidden shadow-lg z-20">
                {embedLink ? (
                    <iframe
                        title="Watch Movie"
                        className="absolute inset-0 w-full h-full rounded-lg object-cover"
                        src={embedLink }
                        allowFullScreen
                        loading="lazy"
                    ></iframe>

                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <p className="text-white text-2xl">Không có video để hiển thị</p>
                    </div>
                )}
            </div>

            <div className="container mx-auto p-4 md:p-8">
                {movie && (
                    <>
                        <h1 className="text-3xl font-semibold">{movie.name}</h1>
                        <p className="text-lg text-gray-400 mt-2">{movie.description}</p>
                        <div className="flex flex-wrap items-center mt-4">
                            <span className="text-gray-400">{movie.time}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-400">{movie.quality}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-400">{movie.language}</span>
                        </div>
                        <div className="flex flex-wrap items-center mt-4">
                            <span className="text-gray-400 mr-2">Đạo diễn:</span>
                            <span>{movie.director}</span>
                        </div>
                        <div className="flex flex-wrap items-center mt-2">
                            <span className="text-gray-400 mr-2">Diễn viên:</span>
                            <span>{movie.casts}</span>
                        </div>
                        <div className="mt-8">
                            <MovieEpisodes episodes={movie.episodes} slug={slug} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WatchMovie;
