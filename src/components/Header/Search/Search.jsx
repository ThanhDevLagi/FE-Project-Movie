import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import SearchList from './SearchList';

const Search = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [showSearchList, setShowSearchList] = useState(false);
    const searchContainerRef = useRef(null);

    const handleFetchData = useRef(
        debounce(async (keyword) => {
            setLoading(true);
            setNotFound(false);
            try {
                const response = await axios.get(`https://phim.nguonc.com/api/films/search?keyword=${keyword}`);
                if (response.data.items && response.data.items.length > 0) {
                    setData(response.data.items);
                    setLoading(false);
                    setShowSearchList(true);
                } else {
                    setData([]);
                    setNotFound(true);
                    setLoading(false);
                    setShowSearchList(true);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }, 500)
    ).current;

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        handleFetchData(value);
    };

    useEffect(() => {
        if (!query) {
            setData([]);
            setNotFound(false);
            setShowSearchList(false);
        }
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSearchList(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={searchContainerRef} className='relative'>
            <div className='relative'>
                <input
                    className='transition-all py-1 px-2 md:py-2 md:px-4 w-full md:w-60 xl:w-72 bg-transparent border-b-2 focus:border-[#22A39F] text-white text-xs md:text-base'
                    type="text"
                    placeholder='Tìm kiếm tại đây...'
                    onChange={handleSearch}
                    onClick={() => setShowSearchList(true)}
                />
                <button className="absolute  top-0 md:top-2 right-2 text-white">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {showSearchList && (
                <div className={`absolute w-full mt-2 bg-[#393E46] z-10 border-[#222e33] rounded-lg`}>
                    <div className='flex flex-col gap-3 p-2'>
                        {loading && (
                            <div id='loading' className='loading w-5 h-5 rounded-full border-blue-500 border-4 border-r-4 border-r-transparent animate-spin mx-auto my-10'></div>
                        )}
                        {!loading && notFound && (
                            <div className='bg-[#393E46] h-12 flex items-center justify-center'>
                                <span className='text-white text-center text-base font-semibold'>Không tìm thấy kết quả</span>
                            </div>
                        )}
                        {!loading && data.length > 0 && <SearchList items={data} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
