import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/auth/user/', { headers: { 'Cache-Control': 'no-cache' } });
      setCurrentUser(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to fetch user data');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (loginData) => {
    try {
      await axios.post('/auth/login/', loginData);
      await fetchUser(); 
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed');
    }
  };

  
  useEffect(() => {

    const checkSession = async () => {
      const token = localStorage.getItem('authToken'); 
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUser();
      } else {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={{ setCurrentUser, handleLogin }}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
