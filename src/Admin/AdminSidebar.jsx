import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartPie, FaFilm } from 'react-icons/fa';

const LinkAdmin = [
    {
        path: "/admin",
        name: "Thống Kê & Báo Cáo",
        icon: <FaChartPie />,
    },
    {
        path: "/admin/movies",
        name: "Quản Lý Bộ Phim",
        icon: <FaFilm />,
    },
];

const AdminSidebar = () => {
    const location = useLocation();

    return (
        <aside className="bg-grey-theme text-white w-72 space-y-6 py-7 px-4 shadow-lg sticky top-0">
            <div className="flex items-center justify-center mb-6">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src="/pictures/Black Minimalist Bicycle Store Logo.png" className="w-44 h-40" alt="logo" />
                </Link>
            </div>
            <nav className="flex flex-col gap-2">
                {LinkAdmin.length > 0 && LinkAdmin.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center gap-3 text-base font-medium py-2.5 px-4 rounded-lg transition duration-200 hover:bg-green-theme ${
                            location.pathname === item.path ? 'bg-green-theme' : 'border-2'
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
