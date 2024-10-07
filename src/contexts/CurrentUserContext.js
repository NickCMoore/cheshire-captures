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
        // Request Interceptor for automatic token refreshing
        axiosReq.interceptors.request.use(
            async (config) => {
                const refreshToken = localStorage.getItem('refresh_token');
                if (shouldRefreshToken() && refreshToken) {
                    try {
                        const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
                            refresh: refreshToken,
                        });
                        localStorage.setItem('access_token', data.access);
                        config.headers.Authorization = `Bearer ${data.access}`;
                    } catch (err) {
                        setCurrentUser(null); // Clear current user
                        removeTokenTimestamp();
                        history.push("/signin");
                        return config;  // Proceed with the request without refreshing
                    }
                }
                return config;
            },
            (err) => Promise.reject(err)
        );

        // Response Interceptor to handle 401 errors and refresh tokens
        axiosRes.interceptors.response.use(
            (response) => response,  // Pass through successful responses
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

                            // Store the new access token
                            localStorage.setItem('access_token', data.access);

                            // Update the original request with the new access token
                            originalRequest.headers.Authorization = `Bearer ${data.access}`;

                            // Retry the original request with the new token
                            return axios(originalRequest);
                        }
                    } catch (tokenRefreshError) {
                        setCurrentUser(null); // Clear current user on token refresh failure
                        removeTokenTimestamp();
                        history.push("/signin");
                    }
                }
                return Promise.reject(err);  // For other errors, reject the request
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
