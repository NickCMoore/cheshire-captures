import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/auth/user/');
      setCurrentUser(response.data);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post('/auth/login/', credentials);
      const token = response.data.key;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      await fetchCurrentUser();
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (credentials) => {
    try {
      const response = await axios.post('/auth/registration/', credentials);
      const token = response.data.key;
      localStorage.setItem('token', token);
      axios.defaults.headers.Authorization = `Token ${token}`;
      await fetchCurrentUser();
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    const csrfToken = getCSRFToken();
    if (!csrfToken) {
      console.error('CSRF token missing');
      return;
    }

    try {
      await axios.post('/auth/logout/', {}, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getCSRFToken = () => {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, registerUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
