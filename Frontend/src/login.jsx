import { useState } from "react";
import { Form, Button, Container, Col, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", JSON.stringify(data.token));
                navigate("/");
            } else {
                console.error("Login failed:", data.error);
                setError(data.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError(error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="4" className="py-5">
                    {error && <Alert variant="danger">{error}.</Alert>}
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
