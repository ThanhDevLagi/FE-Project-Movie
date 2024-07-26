import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
