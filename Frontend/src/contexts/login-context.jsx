import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const localAdminToken = localStorage.getItem("adminToken");

    const setLocalStorageItem = (item, data) =>
        localStorage.setItem(item, JSON.stringify(data));
    const removeLocalStorageItem = (item) => localStorage.removeItem(item);

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [currentUser, setCurrentUser] = useState(user);

    const [adminToken, setAdminToken] = useState(localAdminToken);

    const [isLoggedIn, setIsLoggedIn] = useState(!!token || !!localAdminToken);

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                currentUser,
                setCurrentUser,
                adminToken,
                setAdminToken,
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
