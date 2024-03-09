import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    return useContext(LoginContext);
};
