import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faClose, faHeart, faHome, faSignOutAlt, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const linkWeb = [
    {
        name: 'Trang Chủ',
        link: '/',
        icon: faHome,
        color: "text-green-theme",
        textcolor: "text-white"
    },
    {
        name: 'Phim mới & Phổ biến',
        link: '/phim-moi-pho-bien',
        icon: faVideo,
        color: "text-green-theme",
        textcolor: "text-white"
    },
    {
        name: 'Danh sách phim yêu thích',
        link: '/danh-yeu-thich',
        icon: faHeart,
        color: "text-green-theme",
        textcolor: "text-white"
    },
    {
        name: 'Danh sách phim',
        link: '/danh-sach-phim',
        icon: faClapperboard,
        color: "text-green-theme",
        textcolor: "text-white"
    }
];

const SideBarMenu = React.forwardRef((props, ref) => {
    const { user, show, close, logout } = props;

    return (
        <div className={`fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-gray-700 shadow-2xl transition-transform sm:block md:hidden ${show ? "translate-x-0" : "translate-x-full"}`} ref={ref}>
            <div className='flex flex-col gap-y-4 p-5'>
                <div className='flex justify-between items-center'>
                    {user ? (
                        <img className='w-[50px] h-[50px] rounded-full object-cover' src={`/pictures/${user.img}` || "/pictures/ImageNotFound.png"} alt="Profile" />
                    ) : (
                        <img className='w-[50px] h-[50px] rounded-full object-cover' src={"/pictures/ImageNotFound.png"} alt="Profile" />
                    )}
                    <FontAwesomeIcon className='text-gray-300 text-2xl cursor-pointer' onClick={close} icon={faClose} />
                </div>
                {user && (
                    <div className='flex flex-col gap-y-2'>
                        <h1 className='font-medium text-base text-white'>{user.name}</h1>
                        <span className='text-sm text-gray-400'>{user.email}</span>
                    </div>
                )}
                <ul className='flex flex-col gap-y-2 border-t-2 pt-2'>
                    {user && (
                        <li className='w-full rounded p-2 hover:bg-gray-600'>
                            <Link className='flex items-center text-white' to="/">
                                <FontAwesomeIcon className='text-[#00ADB5] text-xl' icon={faUser} />
                                <span className='ml-4'>Thông tin cá nhân</span>
                            </Link>
                        </li>
                    )}
                    {!user && (
                        <li className='w-full rounded p-2 hover:bg-gray-600'>
                            <Link to="/dang-nhap" className='flex items-center font-semibold text-white'>
                                <FontAwesomeIcon className='text-[#00ADB5] text-xl' icon={faUser} />
                                <span className='ml-4'>Đăng nhập</span>
                            </Link>
                        </li>
                    )}
                    {linkWeb.map((item, index) => (
                        <li className='w-full rounded p-2 hover:bg-gray-600' key={index}>
                            <Link to={item.link} className={`flex items-center font-semibold ${item.textcolor}`}>
                                <FontAwesomeIcon className={`${item.color} text-xl`} icon={item.icon} />
                                <span className='ml-4'>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                   
                    {user && (
                        <li className='w-full rounded p-2 hover:bg-gray-600'>
                            <button
                                className='flex items-center font-semibold text-red-500'
                                onClick={logout}
                            >
                                <FontAwesomeIcon className='text-red-600 text-xl' icon={faSignOutAlt} />
                                <span className='ml-4'>Đăng xuất</span>
                            </button>
                        </li>
                    )}
                </ul>
                <div className='w-full h-[1px] bg-gray-600 mt-4'></div>
            </div>
        </div>
    );
});

export default SideBarMenu;
