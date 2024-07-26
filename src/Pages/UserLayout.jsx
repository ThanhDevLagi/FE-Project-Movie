import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../hooks/AuthContext';

const UserLayout = ({ children }) => {
    const { user, logout } = useAuth();
    return (
        <div>
            <Header user={user} logout={logout}/>
             {children}
            <Footer />
        </div>
    );
};

export default UserLayout;
