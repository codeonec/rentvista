import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import LOGO from "../assets/images/logo.png";
import { useLogin } from "../contexts/login-context";

function NavBar() {
    const { isLoggedIn, setIsLoggedIn } = useLogin();
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
            <Container>
                <Link to="/" className="navbar-brand">
                    <img src={LOGO} width="200px" alt="UrbanNest" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
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
                        <Link to="/properties" className="nav-link">Properties</Link>
                        <Link to="/services" className="nav-link">Services</Link>
                        {isLoggedIn && <Link to="/profile" className="nav-link">Profile</Link>}
                        <Link to="/contact-us" className="nav-link">Contact Us</Link>
                        {isLoggedIn ? (
                            <Link
                                className="nav-link"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setIsLoggedIn(false);
                                    navigate("/login");
                                }}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link to="/login" className="nav-link">Login</Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
