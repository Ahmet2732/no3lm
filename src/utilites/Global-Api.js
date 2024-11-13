// import axios from "axios"


// axios.defaults.baseURL="https://dev.championsacademy.ca/api"
import axios from 'axios';

// Set the base URL for Axios globally
axios.defaults.baseURL = "https://dev.championsacademy.ca/api";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");

    // If the token exists, add it to the request headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Return the modified config so the request can proceed
    return config;
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  }
);



