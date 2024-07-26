import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Movie from './Pages/Movie';
import DetailMovie from './Pages/DetailMovie';
import NotFound from './Pages/NotFound';
import WatchMovie from './Pages/WatchMovie';
import MoviesListCategory from './Pages/MoviesListCategory';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MovieCategory from './Pages/MovieCategory';
import UserLayout from './Pages/UserLayout';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/AdminDashboard';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import FavoritesMovies from './Pages/FavoritesMovies';
import UserInfo from './Pages/UserInfo';
import GuestRoute from './GuestRoute';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<UserLayout><Home /></UserLayout>} />
                <Route path="/phim-moi-pho-bien" element={<UserLayout><Movie /></UserLayout>} />
                <Route path="/phim/:slug" element={<UserLayout><DetailMovie /></UserLayout>} />
                <Route path="/phim/:slug/watch/:episode" element={<UserLayout><WatchMovie /></UserLayout>} />
                <Route path="/danh-sach-phim" element={<UserLayout><MoviesListCategory /></UserLayout>} />
                <Route path="/dang-nhap" element={<GuestRoute><UserLayout><Login /></UserLayout></GuestRoute>} />
                <Route path="/dang-ky" element={<GuestRoute><UserLayout><Register /></UserLayout></GuestRoute>} />
                <Route path="/phim/the-loai/:slug" element={<UserLayout><MovieCategory /></UserLayout>} />
                <Route path="/danh-sach-yeu-thich" element={<ProtectedRoute><UserLayout><FavoritesMovies /></UserLayout></ProtectedRoute>} />
                <Route path="/thong-tin-ca-nhan" element={<ProtectedRoute><UserLayout><UserInfo /></UserLayout></ProtectedRoute>} />
                <Route path="*" element={<UserLayout><NotFound /></UserLayout>} />
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedAdminRoute>
                            <AdminLayout>
                                <AdminDashboard />
                            </AdminLayout>
                        </ProtectedAdminRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
