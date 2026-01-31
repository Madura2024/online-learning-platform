import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/courses/list/');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="landing-container slide-up">
            <header className="hero">
                <h1 className="hero-title">Master New Skills with <br /><span className="text-gradient">EduVantage</span></h1>
                <p className="hero-subtitle">Access premium courses from top instructors around the world. Start your learning journey today.</p>
                <div className="hero-actions">
                    <button onClick={() => document.getElementById('courses-section').scrollIntoView({ behavior: 'smooth' })} className="btn-hero-primary">Explore Courses</button>
                    <button className="btn-hero-secondary">How it works</button>
                </div>
            </header>

            <section id="courses-section" className="featured-courses">
                <div className="section-header">
                    <h2>Featured Courses</h2>
                    <Link to="/courses" className="view-all">View all</Link>
                </div>

                <div className="course-grid">
                    {courses.map(course => (
                        <div key={course.id} className="course-card">
                            <div className="course-image">
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} />
                                ) : (
                                    <div className="placeholder-image">📚</div>
                                )}
                            </div>
                            <div className="course-content">
                                <span className="course-category">Technology</span>
                                <h3>{course.title}</h3>
                                <p className="course-instructor">By {course.instructor_name}</p>
                                <div className="course-footer">
                                    <span className="course-price">Free</span>
                                    <Link to={`/course/${course.id}`} className="btn-enroll">View Course</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Fallback if no courses yet */}
                    {courses.length === 0 && [1, 2, 3].map(i => (
                        <div key={i} className="course-card skeleton">
                            <div className="course-image placeholder-image">🎬</div>
                            <div className="course-content">
                                <span className="course-category">Web Development</span>
                                <h3>Mastering React 18</h3>
                                <p className="course-instructor">By Jane Doe</p>
                                <div className="course-footer">
                                    <span className="course-price">$49.99</span>
                                    <button className="btn-enroll">View Course</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
