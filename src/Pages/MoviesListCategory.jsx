import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const LinkCategories = [
    { name: 'Hành Động', link: 'hanh-dong' },
    { name: 'Hài', link: 'phim-hai' },
    { name: 'Chính Kịch', link: 'chinh-kich' },
    { name: 'TV Shows', link: 'tv-shows' },
    { name: 'Lịch Sử', link: 'lich-su' },
    { name: 'Phiêu Lưu', link: 'phieu-luu' },
    { name: 'Lãng Mạn', link: 'lang-man' },
    { name: 'Tài Liệu', link: 'tai-lieu' },
    { name: 'Hoạt Hình', link: 'hoat-hinh' },
    { name: 'Khoa Học Viễn Tưởng', link: 'khoa-hoc-vien-tuong' },
    { name: 'Tâm lý', link: 'tam-ly' },
    { name: 'Kinh Dị', link: 'kinh-di' },
    { name: '18+', link: 'phim-18' },
];

const MoviesListCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState(LinkCategories[0]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setPage(1);
        setMovies([]);
        window.scrollTo(0, 0);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    const handlePageIncrement = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePageDecrement = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        const newPage = Number(inputValue);
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            setShowInput(false);
            setInputValue('');
        }
    };

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/films/the-loai/${selectedCategory.link}?page=${page}`);
            setMovies(response.data.items || []);
            setTotalPages(response.data.paginate.total_page || 1);
            setLoading(false);
        };
        loadMovies();
        window.scrollTo(0, 0);
    }, [selectedCategory, page]);

    const renderPagination = () => {
        const pages = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 rounded-md ${page === i ? 'bg-green-theme text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 text-base'}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <span key="ellipsis" onClick={() => setShowInput(!showInput)} className="px-3 py-1 text-gray-400 text-lg cursor-pointer">...</span>
            );
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-4 py-2 rounded-md ${page === totalPages ? 'bg-green-theme text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 text-base'}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 bg-gradient-to-b from-gray-800 to-black min-h-screen">
            <div className="flex flex-col gap-4 basis-full lg:basis-1/4 mb-8 lg:mb-0 lg:h-[500px] lg:sticky lg:top-32 custom-scrollbar overflow-y-auto bg-gray-900 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl text-white font-bold mb-4 text-center">Danh Mục</h2>
                {LinkCategories.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleCategoryChange(item)} 
                        className={`cursor-pointer text-lg font-medium py-2 px-4 rounded-md transition-colors ${selectedCategory.link === item.link ? 'bg-green-theme text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                    >
                        Phim {item.name}
                    </div>
                ))}
            </div>
            <div className="flex flex-col basis-full lg:basis-3/4 pl-0 lg:pl-8">
                <span className="text-center text-2xl text-white font-bold mb-8">Phim {selectedCategory.name}</span>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <button className="px-6 py-3 bg-green-theme text-white font-bold rounded-lg shadow-md" disabled>
                            Đang tải...
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                            {movies.map((movie, index) => (
                                <Link to={`/phim/${movie.slug}`} key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                    <img src={movie.thumb_url || movie.poster_url || '/pictures/ImageNotFound.png'} alt={movie.name} className="w-full h-80 object-cover rounded-lg mb-2" />
                                    <h2 className="text-white text-base lg:text-lg font-semibold">{movie.name}</h2>
                                    <p className="text-gray-500 text-sm truncate">{movie.description}</p>
                                </Link>
                            ))}
                        </div>
                        <div className="flex gap-2 justify-center mt-8">
                            <button
                                onClick={handlePageDecrement}
                                className={`transition-all px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-700 text-gray-400' : 'bg-green-theme text-white hover:bg-teal-700'}`}
                                disabled={page === 1}
                            >
                            Trở về
                            </button>
                            {renderPagination()}
                            <button
                                onClick={handlePageIncrement}
                                className={`transition-all px-4 py-2 rounded-md ${page === totalPages ? 'bg-gray-700 text-gray-400' : 'bg-green-theme text-white hover:bg-teal-700'}`}
                                disabled={page === totalPages}
                            >
                               Tiếp Theo
                            </button>
                        </div>
                        {showInput && (
                            <div className="flex justify-center mt-4">
                                <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
                                    <input 
                                        type="text" 
                                        value={inputValue} 
                                        onChange={handleInputChange} 
                                        className="px-3 py-2 rounded-md text-gray-800" 
                                        placeholder="Nhập số trang" 
                                    />
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 bg-green-theme text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                                    >
                                        Tìm kiếm
                                    </button>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MoviesListCategory;
