import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const CurrentUserContext = createContext();
const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get('/auth/user/', { headers: { 'Cache-Control': 'no-cache' } });
      setCurrentUser(data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleLogout();
      } else {
        setError('Failed to fetch user data');
      }
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const { data } = await axios.post('/auth/login/', loginData);
      localStorage.setItem('authToken', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      await fetchUser();
    } catch (err) {
      setError('Login failed');
      console.error('Login failed:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
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
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={{ handleLogin, handleLogout }}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
