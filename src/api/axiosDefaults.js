import axios from "axios";

// Set the base URL for all requests
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// Set default headers
axios.defaults.headers.post["Content-Type"] = "application/json"; // 
axios.defaults.withCredentials = true;

// Create Axios instances for requests and responses
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add CSRF token handling (required for Django with cookies)
axios.defaults.xsrfCookieName = "csrftoken"; 
axios.defaults.xsrfHeaderName = "X-CSRFToken"; 
