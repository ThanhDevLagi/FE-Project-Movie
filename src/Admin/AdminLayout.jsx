import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-gray-800 to-black ">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1 p-6 bg-white shadow-md">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
