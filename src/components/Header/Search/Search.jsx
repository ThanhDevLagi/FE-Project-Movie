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
        <div ref={searchContainerRef} className='relative top-0 left-0 transition-all'>
            <div className='relative'>
                <input
                    className='transition-all py-[4px] px-0 w-[200px] md:w-[160px] xl:px-[12px] xl:py-[8px] lg:w-[260px]  xl:w-[290px] outline-none bg-transparent border-b-2 focus:border-[#22A39F] text-white text-xs xl:text-base'
                    type="text"
                    placeholder='Tìm kiếm tại đây...'
                    onChange={handleSearch}
                    onClick={() => setShowSearchList(true)}
                />
                <button className="absolute top-0 right-0 bottom-0 text-white px-2">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {showSearchList && (
                <div className={`absolute ${data.length > 0 ? "bg-[#393E46]" : ""} w-full z-10 border-[#222e33]`}>
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
