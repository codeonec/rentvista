import NavBar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import RegisterForm from "./register";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </>
    );
}

export default App;
