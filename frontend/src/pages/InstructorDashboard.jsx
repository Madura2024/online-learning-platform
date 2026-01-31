import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const InstructorDashboard = () => {
    const { user, loading } = useAuth();
    const [courses, setCourses] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (user && user.role === 'instructor') {
            const fetchMyCourses = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    const response = await axios.get('http://127.0.0.1:8000/api/courses/list/', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // In a real app, we'd filter by instructor ID on backend
                    // Here we filter locally for demonstration
                    const myCourses = response.data.filter(c => c.instructor === user.id);
                    setCourses(myCourses);
                } catch (error) {
                    console.error('Error fetching instructor courses', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchMyCourses();
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (!user || user.role !== 'instructor') return <Navigate to="/dashboard" />;

    return (
        <div className="dashboard-container fade-in">
            <aside className="sidebar">
                <div className="sidebar-nav">
                    <Link to="/dashboard">Student View</Link>
                    <Link to="/instructor/dashboard" className="active">My Courses (Instructor)</Link>
                    <Link to="/instructor/create">Create New Course</Link>
                </div>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Instructor Dashboard</h2>
                    <p>Manage your professional catalog</p>
                    <Link to="/instructor/create" className="btn-hero-primary">Create New Course</Link>
                </header>

                <section className="instructor-courses">
                    <div className="course-grid">
                        {courses.map(course => (
                            <div key={course.id} className="course-card">
                                <div className="course-content">
                                    <h3>{course.title}</h3>
                                    <p>{course.description.substring(0, 100)}...</p>
                                    <div className="course-footer">
                                        <span>{course.modules?.length || 0} Modules</span>
                                        <Link to={`/course/${course.id}`} className="btn-edit">View/Edit</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {courses.length === 0 && !fetching && (
                        <div className="empty-state">
                            <p>You haven't created any courses yet.</p>
                            <Link to="/instructor/create" className="btn-primary">Build Your First Course</Link>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default InstructorDashboard;
