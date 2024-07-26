import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { isAdmin, isLoading } = useAuth();

    // Đợi khi xác thực người dùng hoàn tất
    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
