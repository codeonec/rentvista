import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import LOGO from "../assets/images/logo.png";
import { useLogin } from "../contexts/login-context";
import { Dropdown } from "react-bootstrap";

const Navigation = () => {
    const {
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        adminToken,
        setAdminToken,
        removeLocalStorageItem,
    } = useLogin();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeLocalStorageItem("token");
        setIsLoggedIn(false);

        removeLocalStorageItem("currentUser");
        setCurrentUser(null);

        navigate("/login");
    };

    const handleAdminLogout = () => {
        removeLocalStorageItem("adminToken");
        setIsLoggedIn(false);
        setAdminToken(null);

        navigate("/login");
    };

    const AdminLinks = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                >
                    UrbenNest Admin
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to="/admin-dashboard"
                    >
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/login"
                        onClick={handleAdminLogout}
                    >
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    const UserLinks = () => {
        return (
            <div className="d-flex">
                <Link to="/my-bookings" className="nav-link">Bookings</Link>

                <Dropdown>
                    <Dropdown.Toggle
                        variant="light"
                        id="dropdown-basic"
                    >
                        {`${currentUser.firstname} ${currentUser.lastname}`}
                        <img
                            src={
                                "http://localhost:5000/assets/uploads/" +
                                currentUser.profilePicture
                            }
                            alt="profile picture"
                            width="32px"
                            height="32px"
                            style={{
                                borderRadius: "40px",
                                marginInline: "0.5rem",
                                objectFit: "cover",
                                border: "2px solid #1e293b",
                                padding: "2px",
                            }}
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                            as={Link}
                            to="/create-listing"
                        >
                            Create Listing
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/my-listings">My Listings</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/my-bookings">My Bookings</Dropdown.Item>

                        <Dropdown.Item as={Link} to="/contact-us">
                            Contact Us
                        </Dropdown.Item>
                        <Dropdown.Item
                            as={Link}
                            to="/login"
                            onClick={handleLogout}
                        >
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }

    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary shadow-sm"
            sticky="top"
        >
            <Container>
                <Link to="/" className="navbar-brand">
                    <img src={LOGO} width="170px" height="40px" alt="UrbanNest" className="m-1" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-between"
                >
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Nav>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/listings" className="nav-link">Listings</Link>
                        {/* <Link to="/services" className="nav-link">Services</Link> */}

                        {adminToken
                            ? <AdminLinks />
                            : isLoggedIn
                                ? <UserLinks />
                                : <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                        }
                    </Nav >
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default Navigation;