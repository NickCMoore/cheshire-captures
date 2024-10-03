import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cheshire-captures-backend-084aac6d9023.herokuapp.com/', 
  withCredentials: true, 
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'csrftoken') {
      return decodeURIComponent(value);
    }
  }
  return null;
}

axiosInstance.defaults.headers.common['X-CSRFToken'] = getCSRFToken();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Token ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token'); 
  }
  return Promise.reject(error);
});

export default axiosInstance;
