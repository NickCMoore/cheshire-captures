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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('User is not authenticated');
      return Promise.resolve(null); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
