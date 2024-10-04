import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/Utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('/auth/user/');
      setCurrentUser(data);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('/auth/token/refresh/');
          } catch (err) {
            console.error('Error refreshing token:', err);
            setCurrentUser(null);
            removeTokenTimestamp();
            history.push('/signin');
          }
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/auth/token/refresh/');
          } catch (refreshErr) {
            console.error('Error refreshing token:', refreshErr);
            setCurrentUser(null);
            removeTokenTimestamp();
            history.push('/signin');
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
