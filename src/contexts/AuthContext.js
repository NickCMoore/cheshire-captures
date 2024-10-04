import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/auth/user/');
        setCurrentUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false); 
      }
    };
    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {!loading ? children : <div>Loading...</div>}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
