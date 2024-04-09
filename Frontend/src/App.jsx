import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import NewRegister from "./pages/NewRegister";
import Home from "./pages/Home";
import NewLogin from "./pages/NewLogin";
import NewProfile from "./pages/NewProfile";
import EditProfile from "./pages/EditProfile";
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import ForgotPasswordForm from "./pages/forgotPassword";
import ResetPasswordPage from "./pages/resetPassword";
import CreateListing from "./pages/CreateListing";
import Listings from "./pages/Listings";
import MyListings from "./pages/MyListings";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UpdateListing from "./pages/UpdateListing";
import IndividualListing from "./pages/IndividualListing";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<NewLogin />} />
                <Route path="/register" element={<NewRegister />} />
                <Route path="/listings/:type" element={<Listings />} />
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
                    path="/update-listing/:id"
                    element={
                        <PrivateRoute>
                            <UpdateListing />
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
                <Route
                    path="/my-bookings"
                    element={
                        <PrivateRoute>
                            <MyBookings />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/listing/:id"
                    element={<IndividualListing />}
                />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordForm />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                    path="/admin-dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
