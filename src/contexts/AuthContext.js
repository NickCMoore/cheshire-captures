import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosDefaults';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
  
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get('/dj-rest-auth/user/');
        setCurrentUser(response.data);
      } catch (error) {
        setCurrentUser(null);
      }
    };
  
    const signupUser = async (data) => {
      try {
        await axiosInstance.post('/dj-rest-auth/registration/', data);
        await fetchCurrentUser(); 
      } catch (error) {
        throw error;
      }
    };
  
    useEffect(() => {
      fetchCurrentUser();
    }, []);
  
    const loginUser = async (credentials) => {
      try {
        await axiosInstance.post('/dj-rest-auth/login/', credentials);
        await fetchCurrentUser();
      } catch (error) {
        throw error;
      }
    };
  
    const logoutUser = async () => {
      try {
        await axiosInstance.post('/dj-rest-auth/logout/');
        setCurrentUser(null);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <AuthContext.Provider value={{ currentUser, loginUser, logoutUser, signupUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  