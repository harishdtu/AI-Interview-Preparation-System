import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
    timeout: 80000, // Set a timeout for requests (optional) 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

//Request Interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
},
    (error) => {
        //Handle common errors like 401 Unauthorized or 500 Server Error
        if (error.response) {
            if (error.response.status === 401) {
                //Redirect to login page or show a message
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("Server error:", "Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout:", "Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;