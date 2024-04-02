import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./css/main.min.css";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./contexts/login-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <LoginProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </LoginProvider>
    </React.StrictMode>
);
