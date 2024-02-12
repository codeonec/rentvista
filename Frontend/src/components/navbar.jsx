import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LOGO from "../assets/images/logo.png"

function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
            <Container>
                <Link to="/" className="navbar-brand"><img src={LOGO} width="200px" alt="UrbanNest" /></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/properties" className="nav-link">Properties</Link>
                        <Link to="/services" className="nav-link">Services</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <Link to="/contact-us" className="nav-link">Contact Us</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary mx-2">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
