import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const setLocalStorageItem = (item, data) =>
        localStorage.setItem(item, JSON.stringify(data));
    const removeLocalStorageItem = (item) => localStorage.removeItem(item);

    const [authToken, setAuthToken] = useState(token);
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [currectUser, setCurrentUser] = useState(user);

    const [adminToken, setAdminToken] = useState(() => {
        const localAdminToken = localStorage.getItem("adminToken");
        if (localAdminToken) return localAdminToken;
        return "";
    });

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                currectUser,
                setCurrentUser,
                adminToken,
                setAdminToken,
                authToken,
                setAuthToken,
                setLocalStorageItem,
                removeLocalStorageItem,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    return useContext(LoginContext);
};
