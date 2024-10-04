import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/auth/user/');
      setCurrentUser(data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const getCSRFToken = () => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  };  

  const logoutUser = async () => {
    try {
      const csrfToken = getCSRFToken();
      if (!csrfToken) {
        console.error('CSRF token missing');
        return;
      }
  
      await axios.post(
        '/auth/logout/',
        {},
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };
  

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

