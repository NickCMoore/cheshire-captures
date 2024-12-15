import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleUnauthorized = useCallback(
    (err) => {
      console.error("Authorization error: ", err);
      removeTokenTimestamp();
      setCurrentUser(null);
      history.push("/signin");
    },
    [history, setCurrentUser],
  );

  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }
            const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
              refresh: refreshToken,
            });
            localStorage.setItem("accessToken", data.access);
            config.headers["Authorization"] = `Bearer ${data.access}`;
          } catch (err) {
            handleUnauthorized(err);
          }
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }
            const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
              refresh: refreshToken,
            });
            localStorage.setItem("accessToken", data.access);
            err.config.headers["Authorization"] = `Bearer ${data.access}`;
            return axiosRes(err.config);
          } catch (err) {
            handleUnauthorized(err);
          }
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [handleUnauthorized]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

// PropTypes validation for children
CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
