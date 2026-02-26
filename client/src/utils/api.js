import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.57.3:5000/api',
    withCredentials: true // <--- ADD THIS HERE
});

// The "Global Error Handler"
api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            window.location.href = "/login"; // Force redirect
        } else if (status === 500) {
            alert("The server is having a bad day. Please try again later.");
        } else if (!error.response) {
            alert("Network error: Please check your internet connection.");
        }

        // Return a rejected promise so the local component can still see the error
        return Promise.reject(error);
    }
);

export default api;
