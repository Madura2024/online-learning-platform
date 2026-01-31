import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://127.0.0.1:8000/api/users/';

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check if token is expired
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    fetchCurrentUser(token);
                }
            } catch (e) {
                logout();
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCurrentUser = async (token) => {
        try {
            const response = await axios.get(`${API_URL}me/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}token/`, { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            await fetchCurrentUser(response.data.access);
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            await axios.post(`${API_URL}`, userData);
            return true;
        } catch (error) {
            console.error('Registration failed', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
