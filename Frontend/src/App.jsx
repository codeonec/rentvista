import NavBar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import NewRegister from "./pages/NewRegister";
import Home from "./pages/Home";
import NewLogin from "./pages/NewLogin";
import NewProfile from "./pages/NewProfile";
import EditProfile from "./pages/EditProfile";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import ForgotPasswordForm from "./pages/forgotPassword";
import ResetPasswordPage from "./pages/resetPassword";
import CreateListing from "./pages/CreateListing";
import Listings from "./pages/Listings";
import MyListings from "./pages/MyListings";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<NewLogin />} />
                <Route path="/register" element={<NewRegister />} />
                <Route path="/listings" element={<Listings />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <NewProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-listing"
                    element={
                        <PrivateRoute>
                            <CreateListing />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/services"
                    element={
                        <PrivateRoute>
                            <Services />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my-listings"
                    element={
                        <PrivateRoute>
                            <MyListings />
                        </PrivateRoute>
                    }
                />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
