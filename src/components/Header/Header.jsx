import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search/Search';
import SideBarMenu from './SideBar/SideBarMenu';
import UserDropdown from './UserDropDown/UserDropDown';

const linkWeb = [
    {
        name: 'Trang Chủ',
        link: '/'
    },
    {
        name: 'Phim bộ',
        link: '/phim-bo'
    },
    {
        name: 'Phim mới & Phổ biến',
        link: '/phim-moi-pho-bien'
    },
    {
        name: 'Danh sách phim',
        link: '/danh-sach-phim'
    },
   
];

const Header = ({ user, logout }) => { // Receive the user as a prop
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <header className='px-4 py-2 md:px-8 md:py-4 w-full bg-grey-theme text-white shadow-md sticky top-0 z-20'>
            <div className=' mx-auto flex items-center justify-between'>
                <div className='flex items-center gap-8'>
                    <Link to={"/"} className='w-24 lg:w-40 h-16'>
                        <img src="/pictures/Black Minimalist Bicycle Store Logo.png" className='object-cover w-full h-full' alt="logo" />
                    </Link>
                    <nav className='hidden md:flex items-center gap-4 xl:gap-6'>
                        {linkWeb.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className={`text-xs xl:text-lg underline-hover font-medium text-white hover:text-green-theme transition-all duration-300 ${location.pathname === item.link ? 'text-green-theme' : ''}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='ml-auto md:mf-0 flex items-center gap-4 xl:gap-6'>
                    <Search />
                    {user ? (
                        <div className='hidden md:block z-30'>
                                <UserDropdown user={user} logout={logout}/>
                            </div>
                    ) : (
                        <Link to={"/dang-nhap"} className="px-3 py-1 lg:px-4 lg:py-2 hover:bg-green-theme text-white text-xs md:text-lg font-semibold rounded-lg border-2 border-white duration-300 transition-all hover:border-teal- h-fit min-w-fit">
                            Đăng nhập
                        </Link>
                    )}
                    <button className="md:hidden text-white" onClick={toggleSidebar}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <SideBarMenu show={showSidebar} user={user} logout={logout} close={() => setShowSidebar(false)} />
            </div>
        </header>
    );
};

export default Header;
