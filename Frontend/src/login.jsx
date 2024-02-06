import React, { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        // Make API call to handle login (use axios or fetch)
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="4" className="py-5">
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            className="mt-3 w-100"
                        >
                            Login
                        </Button>

                        <p className="mt-3">
                            Not a member?{" "}
                            <Link to="/register">Register now</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
