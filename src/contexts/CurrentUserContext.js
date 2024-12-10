import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CurrentUserContext = createContext();
const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleMount = async () => {
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                setLoading(false);
                return; // No refresh token, no need to check authentication
            }

            try {
                // Attempt to refresh the token
                await axios.post("/dj-rest-auth/token/refresh/", { refresh: refreshToken });
                // Fetch the current user's details
                const { data } = await axios.get("/dj-rest-auth/user/");
                setCurrentUser(data);
            } catch (err) {
                console.log("Authentication error:", err);
                setCurrentUser(null); // Not authenticated
            } finally {
                setLoading(false);
            }
        };

        handleMount();
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {!loading && children} {/* Render children only after loading */}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};
