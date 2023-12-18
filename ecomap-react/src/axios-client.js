import axios from "axios";

// Set the access token for testing
localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDIiLCJ1c2VySWQiOjMwMiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsImV4cCI6MTcwMzY4NjE5OX0.Udu2UGKkQj34rouh_bVVqTRLwT0Fgc4ITljNNW08HHbYeX3lLPKpm5EFdAEGlq-obkiZulz7dT5RG2x4FxsWjQ');

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    try {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    } catch(e){
        console.error(e);
    }
    throw error;
});

export default axiosClient;