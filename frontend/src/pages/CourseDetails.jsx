import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './CourseDetails.css';

const CourseDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/courses/list/${id}/`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course', error);
            }
        };
        fetchCourse();
    }, [id]);

    useEffect(() => {
        if (user && course) {
            const checkEnrollment = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    const response = await axios.get(`http://127.0.0.1:8000/api/courses/enrollments/`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const enrolled = response.data.some(en => en.course === parseInt(id));
                    setIsEnrolled(enrolled);
                } catch (error) { }
            };
            checkEnrollment();
        }
    }, [user, course, id]);

    const handleEnroll = async () => {
        if (!user) {
            return navigate('/register');
        }
        try {
            const token = localStorage.getItem('access_token');
            await axios.post(`http://127.0.0.1:8000/api/courses/enrollments/`, {
                course: id,
                student: user.id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsEnrolled(true);
        } catch (error) {
            console.error('Enrollment failed', error);
        }
    };

    if (!course) return <div className="loading">Loading...</div>;

    return (
        <div className="course-details-container fade-in">
            <div className="course-banner glass-panel">
                <div className="banner-content">
                    <span className="badge">Featured Course</span>
                    <h1>{course.title}</h1>
                    <p className="instructor-info">Created by <strong>{course.instructor_name || 'Expert Instructor'}</strong></p>
                    <div className="banner-stats">
                        <span>⭐ 4.8 (1.2k reviews)</span>
                        <span>👥 5,000 students</span>
                        <span>🕒 12 hours total</span>
                    </div>
                    <div className="banner-actions">
                        {isEnrolled ? (
                            <div className="enrolled-status">
                                <span className="enrolled-msg">✅ You are enrolled</span>
                                <Link to="/dashboard" className="btn-go-dash">Go to Dashboard</Link>
                            </div>
                        ) : (
                            <button onClick={handleEnroll} className="btn-enroll-now">Enroll Now - Free</button>
                        )}
                    </div>
                </div>
                <div className="banner-image">
                    {course.thumbnail ? <img src={course.thumbnail} alt={course.title} /> : <div className="placeholder-large">📽️</div>}
                </div>
            </div>

            <div className="course-tabs">
                <div className="tabs-header">
                    <button className="active">Curriculum</button>
                    <button>Overview</button>
                    <button>Instructor</button>
                </div>

                <div className="tab-content curriculum">
                    {course.modules && course.modules.map((module, idx) => (
                        <div key={module.id} className="module-item">
                            <div className="module-header">
                                <h3>Module {idx + 1}: {module.title}</h3>
                            </div>
                            <div className="lessons-list">
                                {module.lessons && module.lessons.map(lesson => (
                                    <div key={lesson.id} className="lesson-row">
                                        <span className="lesson-icon">📄</span>
                                        <span className="lesson-name">{lesson.title}</span>
                                        {isEnrolled ? (
                                            <Link to={`/lesson/${lesson.id}`} className="btn-view-lesson">Start Lesson</Link>
                                        ) : (
                                            <span className="lesson-locked">🔒</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {(!course.modules || course.modules.length === 0) && (
                        <p className="no-content">No curriculum items available yet. Stay tuned!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
