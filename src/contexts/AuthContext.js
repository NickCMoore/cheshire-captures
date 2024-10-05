import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
export const SetAuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const useSetAuth = () => useContext(SetAuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCSRFToken = () => {
    let csrfToken = null;
    if (document.cookie) {
      document.cookie.split('; ').forEach(cookie => {
        if (cookie.startsWith('csrftoken=')) {
          csrfToken = cookie.split('=')[1];
        }
      });
    }
    return csrfToken;
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/auth/user/');
      setCurrentUser(data);
    } catch {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (credentials) => {
    const csrfToken = getCSRFToken();
    await axios.post('/auth/login/', credentials, {
      headers: { 'X-CSRFToken': csrfToken },
    });
    await fetchCurrentUser();
  };

  const logoutUser = async () => {
    const csrfToken = getCSRFToken();
    if (!csrfToken) return;
    await axios.post('/auth/logout/', {}, {
      headers: { 'X-CSRFToken': csrfToken },
    });
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <SetAuthContext.Provider value={{ loginUser, logoutUser }}>
        {!loading && children}
      </SetAuthContext.Provider>
    </AuthContext.Provider>
  );
};
