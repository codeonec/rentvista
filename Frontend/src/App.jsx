import NavBar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import RegisterForm from "./register";
import Profile from "./components/Profile";
import Properties from "./components/Properties";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
        </>
    );
}

export default App;
