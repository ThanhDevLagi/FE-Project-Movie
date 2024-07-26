import React from 'react';
import { Link } from 'react-router-dom';

const MovieEpisodes = ({ episodes, slug }) => {
    console.log('Episodes:', episodes);
    console.log('Slug:', slug);

    return (
        <>
            {episodes && episodes.map((episodeGroup, index) => (
                <div key={index} className='mb-8'>
                    <h2 className='text-white text-lg font-semibold mb-4'>{episodeGroup.server_name}</h2>
                    <div className='flex flex-wrap gap-4'>
                        {episodeGroup.items.map((episode, idx) => (
                            <Link
                                to={`/phim/${slug}/watch/${episode.name}`}
                                key={idx}
                                className='px-4 py-1 bg-gray-100 rounded-md shadow-sm text-center hover:bg-gray-200 transition-colors duration-200'
                            >
                                <span className='text-lg font-medium text-gray-800'>{episode.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieEpisodes;
