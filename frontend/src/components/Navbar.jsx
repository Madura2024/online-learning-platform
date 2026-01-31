import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar glass-panel">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">🎓</span>
                    <span className="logo-text">EduVantage</span>
                </Link>
                <div className="nav-links">
                    <Link to="/">Courses</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard">My Learning</Link>
                            <Link to="/profile">Profile</Link>
                            <span className="user-welcome">Hi, {user.username}</span>
                            <button onClick={logout} className="btn-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="btn-primary">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
