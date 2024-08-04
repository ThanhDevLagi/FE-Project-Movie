import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add logout functionality
        navigate('/');
    };

    return (
        <header className="text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">Xin chào Admin - Cao Hoàng Thành</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
                Đăng Xuất
            </button>
        </header>
    );
};

export default AdminHeader;
