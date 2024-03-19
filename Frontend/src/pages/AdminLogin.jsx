// AdminLogin.js

import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../contexts/login-context";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        setIsLoggedIn,
        setAdminToken,
        setLocalStorageItem,
        removeLocalStorageItem,
        setCurrentUser,
    } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Remove Current LoggedIn User first
                removeLocalStorageItem("token");
                setIsLoggedIn(false);

                removeLocalStorageItem("currentUser");
                setCurrentUser(null);

                setLocalStorageItem("adminToken", data.token);
                setIsLoggedIn(true);
                setAdminToken(data.token);

                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    navigate("/admin-dashboard");
                }, 1000);
            } else {
                console.error("Login failed:", data.error);
                setIsLoggedIn(false);
                setError(data.error);
                setSuccess(false);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An Error Occurred");
            setSuccess(false);
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md="4">
                    <h2>Admin Login</h2>
                    {success && (
                        <Alert variant="success">Login Successful.</Alert>
                    )}
                    {error && <Alert variant="danger">{error}.</Alert>}
                    <Form onSubmit={handleLogin} className="mt-3">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username or Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username or email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formBasicPassword"
                            className="mt-3"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                        >
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;
