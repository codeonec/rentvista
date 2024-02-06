// RegisterForm.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("traveler");

    const handleRegister = (e) => {
        e.preventDefault();
        // Add your registration logic here
        console.log("Register:", username, email, password, accountType);
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md="4">
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicAccountType" className="mt-3">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                            >
                                <option value="propertyOwner">
                                    Property Owner
                                </option>
                                <option value="traveler">Traveler</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;
