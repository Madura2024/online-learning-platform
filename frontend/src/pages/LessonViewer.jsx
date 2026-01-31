import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './LessonViewer.css';

const LessonViewer = () => {
    const { id } = useParams();
    const { user, loading } = useAuth();
    const [lesson, setLesson] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://127.0.0.1:8000/api/courses/lessons/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLesson(response.data);
            } catch (error) {
                console.error('Error fetching lesson', error);
            } finally {
                setFetching(false);
            }
        };
        if (user) fetchLesson();
        else if (!loading) setFetching(false);
    }, [id, user, loading]);

    if (loading || fetching) return <div className="loading">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (!lesson) return <div>Lesson not found or access denied.</div>;

    return (
        <div className="lesson-viewer-container fade-in">
            <div className="lesson-header">
                <Link to="/dashboard" className="btn-back">← Back to Dashboard</Link>
                <h2>{lesson.title}</h2>
            </div>

            <div className="lesson-content-layout">
                <div className="lesson-body glass-panel">
                    {lesson.video_url ? (
                        <div className="video-wrapper">
                            <iframe
                                src={lesson.video_url.includes('?') ? `${lesson.video_url}&enablejsapi=1` : `${lesson.video_url}?enablejsapi=1`}
                                title={lesson.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    ) : (
                        <div className="no-video glass-panel" style={{ padding: '4rem', textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
                            <h3>Reading Material</h3>
                            <p>This lesson is optimized for reading. Dive into the detailed content below.</p>
                        </div>
                    )}

                    <div className="lesson-text">
                        <div className="lesson-description-header">
                            <h3>Lesson Description</h3>
                            {lesson.video_url && (
                                <a
                                    href={lesson.video_url.replace('embed/', 'watch?v=')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="youtube-fallback-link"
                                >
                                    📺 Watch on YouTube
                                </a>
                            )}
                        </div>
                        <div className="text-content">
                            {lesson.content || "No detailed content provided for this lesson yet."}
                        </div>
                    </div>
                </div>

                <aside className="lesson-sidebar">
                    <div className="task-card">
                        <h4>Mark as Complete</h4>
                        <p>Finish the lesson to progress.</p>
                        <button className="btn-complete">Complete Lesson</button>
                    </div>

                    <div className="quiz-card">
                        <h4>Check Your Knowledge</h4>
                        <p>Take the quiz associated with this course.</p>
                        <Link to={`/quiz/${lesson.course_id || 1}`} className="btn-quiz" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Start Quiz</Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LessonViewer;
