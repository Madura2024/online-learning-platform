import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const ProfilePage = () => {
    const { user, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        bio: user?.bio || ''
    });

    if (loading) return <div className="loading">Loading...</div>;
    if (!user) return <div className="error-message">Please log in to view your profile.</div>;

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="dashboard-container fade-in">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Account</h3>
                </div>
                <nav className="sidebar-nav">
                    <a href="/dashboard">Back to Dashboard</a>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Your Profile</h2>
                    <p>Manage your account settings and preferences.</p>
                </header>

                <div className="profile-card glass-panel">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-info">
                            <h3>{user.username}</h3>
                            <span className="badge">{user.role.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="profile-details">
                        <div className="detail-group">
                            <label>Email Address</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="detail-group">
                            <label>Bio</label>
                            <p>{user.bio || 'No bio provided.'}</p>
                        </div>
                        <div className="detail-group">
                            <label>Account Status</label>
                            <p className="status-active">Active</p>
                        </div>
                    </div>

                    <button className="btn-hero-primary" style={{ marginTop: '20px' }}>
                        Edit Profile (Coming Soon)
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
