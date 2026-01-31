import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchEnrollments = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    const response = await axios.get('http://127.0.0.1:8000/api/courses/enrollments/', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setEnrollments(response.data);
                } catch (error) {
                    console.error('Error fetching enrollments', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchEnrollments();
        }
    }, [user]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className="dashboard-container fade-in">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Menu</h3>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="active">My Courses</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/grades">Grades</Link>
                    {user.role === 'instructor' && (
                        <>
                            <hr />
                            <Link to="/instructor/dashboard">Instructor Panel</Link>
                            <Link to="/instructor/create">Create Course</Link>
                        </>
                    )}
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Welcome back, {user.username}!</h2>
                    <p>Pick up where you left off.</p>
                </header>

                <section className="my-courses">
                    <div className="section-title">
                        <h3>My Enrollments</h3>
                    </div>

                    <div className="course-list">
                        {enrollments.length > 0 ? (
                            enrollments.map(en => (
                                <div key={en.id} className="dash-course-card">
                                    <div className="dash-course-info">
                                        <h4>Course ID: {en.course}</h4>
                                        <p>Status: {en.completed ? 'Completed' : 'In Progress'}</p>
                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill" style={{ width: en.completed ? '100%' : '30%' }}></div>
                                        </div>
                                    </div>
                                    <Link to={`/course/${en.course}`} className="btn-continue">Continue</Link>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>You are not enrolled in any courses yet.</p>
                                <Link to="/" className="btn-explore">Explore Courses</Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
