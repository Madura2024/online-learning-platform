import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://127.0.0.1:8000/api/courses/list/', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/instructor/dashboard');
        } catch (error) {
            console.error('Course creation failed', error);
            alert('Failed to create course. Please try again.');
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card glass-panel" style={{ maxWidth: '600px' }}>
                <h2>Create New Course</h2>
                <p className="auth-subtitle">Share your knowledge with the world</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Course Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="e.g. Advanced Web Development"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            placeholder="Describe what students will learn..."
                            rows="6"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-auth">Launch Course</button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
