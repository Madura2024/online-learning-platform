import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css'; // Reusing dashboard styles for glass effect

const Quiz = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/courses/quizzes/${id}/`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz', error);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleNext = () => {
        if (selectedOption === quiz.questions[currentQuestion].correct_option) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < quiz.questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = async () => {
        const finalScore = Math.round(((score + (selectedOption === quiz.questions[currentQuestion].correct_option ? 1 : 0)) / quiz.questions.length) * 100);
        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://127.0.0.1:8000/api/courses/grades/', {
                quiz: id,
                student: user.id,
                score: finalScore
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowResults(true);
        } catch (error) {
            console.error('Failed to submit quiz', error);
            setShowResults(true); // Still show results locally
        }
    };

    if (!quiz) return <div className="loading">Loading quiz...</div>;

    if (showResults) {
        return (
            <div className="dashboard-container fade-in">
                <div className="results-card glass-panel text-center" style={{ padding: '3rem', maxWidth: '600px', margin: '2rem auto' }}>
                    <div className="icon-success" style={{ fontSize: '4rem' }}>🏆</div>
                    <h2>Quiz Completed!</h2>
                    <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Your Score: <strong>{Math.round((score / quiz.questions.length) * 100)}%</strong></p>
                    <button onClick={() => navigate('/dashboard')} className="btn-hero-primary">Back to Dashboard</button>
                    <button onClick={() => navigate('/grades')} className="btn-outline" style={{ marginLeft: '10px' }}>View All Grades</button>
                </div>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];

    return (
        <div className="dashboard-container fade-in">
            <main className="dashboard-main" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <header className="dashboard-header text-center">
                    <h2>{quiz.title}</h2>
                    <p>Question {currentQuestion + 1} of {quiz.questions.length}</p>
                </header>

                <div className="quiz-question glass-panel">
                    <h3>{question.text}</h3>
                    <div className="options-list" style={{ marginTop: '20px' }}>
                        {[question.option1, question.option2, question.option3, question.option4].map((opt, idx) => (
                            <div
                                key={idx}
                                className={`option-item ${selectedOption === idx + 1 ? 'selected' : ''}`}
                                onClick={() => setSelectedOption(idx + 1)}
                                style={{
                                    padding: '1rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                    background: selectedOption === idx + 1 ? '#eff6ff' : 'white',
                                    borderColor: selectedOption === idx + 1 ? 'var(--primary)' : 'var(--border)'
                                }}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={selectedOption === null}
                        className="btn-hero-primary"
                        style={{ width: '100%', marginTop: '20px' }}
                    >
                        {currentQuestion + 1 === quiz.questions.length ? 'Submit Quiz' : 'Next Question'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Quiz;
