import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetails';
import LessonViewer from './pages/LessonViewer';
import ProfilePage from './pages/ProfilePage';
import GradesPage from './pages/GradesPage';
import Quiz from './pages/Quiz';
import InstructorDashboard from './pages/InstructorDashboard';
import CreateCourse from './pages/CreateCourse';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Navbar />
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/grades" element={<GradesPage />} />
                            <Route path="/quiz/:id" element={<Quiz />} />
                            <Route path="/course/:id" element={<CourseDetails />} />
                            <Route path="/lesson/:id" element={<LessonViewer />} />
                            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                            <Route path="/instructor/create" element={<CreateCourse />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
