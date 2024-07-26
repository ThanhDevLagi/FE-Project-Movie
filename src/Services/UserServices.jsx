import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const getUserEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/users/${email}`);
        return response.data.email;
    } catch (error) {
        console.error("Error getting user email", error);
        throw error;
    }
};

export const registerUser = async (email, password, name) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password, name });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};