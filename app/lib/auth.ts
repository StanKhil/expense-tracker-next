import axios from 'axios';
import { setCredentials, clearCredentials } from "../store/authSlice";
import { store } from "../store/store";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const login = async (name: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, { name, password });
        console.log(`${apiUrl}/auth/login`, { name, password });
        store.dispatch(setCredentials({ 
            token: response.data.token, 
            userName: name 
        }));

        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const register = async (name: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/register`, { name, password });

        store.dispatch(setCredentials({
            token: response.data.token,
            userName: name
        }));

        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const logout = () => { 
    store.dispatch(clearCredentials());
    localStorage.removeItem('token');
};