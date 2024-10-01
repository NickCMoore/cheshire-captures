import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosDefaults';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`; 
        const response = await axiosInstance.get('/auth/user/');
        setCurrentUser(response.data);
      } else {
        setCurrentUser(null); 
      }
    } catch (error) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const loginUser = async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login/', credentials);
      const token = response.data.key; 
      localStorage.setItem('token', token); 
      axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`; 
      await fetchCurrentUser();
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post('/auth/logout/');
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization']; 
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
