import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const GradesPage = () => {
    const { user, loading } = useAuth();
    const [grades, setGrades] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchGrades = async () => {
                try {
                    const token = localStorage.getItem('access_token');
                    const response = await axios.get('http://127.0.0.1:8000/api/courses/grades/', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setGrades(response.data);
                } catch (error) {
                    console.error('Error fetching grades', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchGrades();
        }
    }, [user]);

    if (loading || fetching) return <div className="loading">Loading grades...</div>;

    return (
        <div className="dashboard-container fade-in">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Academic</h3>
                </div>
                <nav className="sidebar-nav">
                    <a href="/dashboard">Back to Dashboard</a>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Your Grades</h2>
                    <p>Track your assessment results and academic progress.</p>
                </header>

                <div className="grades-list glass-panel">
                    {grades.length > 0 ? (
                        <table className="grades-table">
                            <thead>
                                <tr>
                                    <th>Assessment / Quiz</th>
                                    <th>Score</th>
                                    <th>Date Taken</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map(grade => (
                                    <tr key={grade.id}>
                                        <td>{grade.quiz_title || `Quiz #${grade.quiz}`}</td>
                                        <td className="score-cell">{grade.score}%</td>
                                        <td>{new Date(grade.taken_at).toLocaleDateString()}</td>
                                        <td><span className="badge-success">Passed</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty-state">
                            <p>No assessment data found yet. Start learning and take your first quiz!</p>
                            <a href="/" className="btn-explore">Explore Courses</a>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default GradesPage;
