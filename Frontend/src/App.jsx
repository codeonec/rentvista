import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Properties from "./pages/Properties";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import NewRegister from "./pages/NewRegister";
import Home from "./pages/Home";
import NewLogin from "./pages/NewLogin";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<NewLogin />} />
                <Route path="/register" element={<NewRegister />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
        </>
    );
}

export default App;
