import { Navigate, useLocation } from "react-router-dom";
import { useLogin } from "../contexts/login-context";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useLogin();
    const location = useLocation();

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export const AdminRoute = ({ children }) => {
    const { isLoggedIn, adminToken } = useLogin();
    const location = useLocation();

    return adminToken && isLoggedIn ? (
        children
    ) : (
        <Navigate to="/admin-login" state={{ from: location }} replace />
    );
};
