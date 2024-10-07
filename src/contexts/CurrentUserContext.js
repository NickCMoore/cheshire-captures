import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/Utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    const handleMount = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            try {
                const { data } = await axiosRes.get('dj-rest-auth/user/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setCurrentUser(data);
            } catch (err) {
                console.log("Error fetching user data:", err);
            }
        }
    };

    useEffect(() => {
        handleMount();
    }, []);

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                const accessToken = localStorage.getItem('access_token');
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                const refreshToken = localStorage.getItem('refresh_token');
                if (shouldRefreshToken() && refreshToken) {
                    try {
                        const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
                            refresh: refreshToken,
                        });
                        localStorage.setItem('access_token', data.access);
                        config.headers.Authorization = `Bearer ${data.access}`;
                    } catch (err) {
                        setCurrentUser(null);
                        removeTokenTimestamp();
                        history.push("/signin");
                    }
                }
                return config;
            },
            (err) => Promise.reject(err)
        );

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                const originalRequest = err.config;
                if (err.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem('refresh_token');
                        if (refreshToken) {
                            const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
                                refresh: refreshToken,
                            });
                            localStorage.setItem('access_token', data.access);
                            originalRequest.headers.Authorization = `Bearer ${data.access}`;
                            return axios(originalRequest);  
                        }
                    } catch (tokenRefreshError) {
                        setCurrentUser(null);
                        removeTokenTimestamp();
                        history.push("/signin");
                    }
                }
                return Promise.reject(err);
            }
        );
    }, [history]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};

