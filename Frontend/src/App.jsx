import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Properties from "./pages/Properties";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import NewRegister from "./pages/NewRegister";
import Home from "./pages/Home";
import NewLogin from "./pages/NewLogin";
import NewProfile from "./pages/NewProfile";
import EditProfile from "./pages/EditProfile";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<NewLogin />} />
                <Route path="/register" element={<NewRegister />} />
                <Route path="/profile" element={<NewProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
        </>
    );
}

export default App;
