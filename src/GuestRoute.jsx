import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';

const GuestRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;
