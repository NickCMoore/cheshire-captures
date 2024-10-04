import React, { createContext, useState, useEffect, useContext } from 'react'; // Add all necessary imports
import { axiosReq } from '../api/axiosDefaults';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosReq.get('/auth/user/');
      setCurrentUser(response.data);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const loginUser = async (credentials) => {
    try {
      const response = await axiosReq.post('/auth/login/', {
        username: credentials.username,
        password: credentials.password,
      });
      const token = response.data.key;
      localStorage.setItem('token', token);
      axiosReq.defaults.headers.common['Authorization'] = `Token ${token}`;
      await fetchCurrentUser();
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (credentials) => {
    try {
      const response = await axiosReq.post('/auth/registration/', credentials);
      const token = response.data.key;
      localStorage.setItem('token', token);
      axiosReq.defaults.headers.Authorization = `Token ${token}`;
      await fetchCurrentUser();
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await axiosReq.post('/auth/logout/');
      localStorage.removeItem('token');
      delete axiosReq.defaults.headers.Authorization;
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
