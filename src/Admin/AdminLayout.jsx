import React from 'react';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminHeader />
            <div>{children}</div>
        </div>
    );
};

export default AdminLayout;
