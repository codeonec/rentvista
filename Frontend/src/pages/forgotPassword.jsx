// ForgotPasswordForm.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            // Send a request to the backend to handle the forgot password logic
            const response = await fetch(
                "http://localhost:5000/user/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(
                    "Forgot password request successful:",
                    data.message
                );
                setSuccess(true);
                // Optionally, show a success message or redirect to a confirmation page
            } else {
                console.error("Forgot password request failed:", data.error);
                // Handle request failure, display an error message, etc.
            }
        } catch (error) {
            console.error("Error during forgot password request:", error);
            // Handle unexpected errors
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="4" className="py-5">
                    {success ? (
                        <p>Successfully sent the password reset link to your email.</p>
                    ) : (
                        <Form onSubmit={handleForgotPassword}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="mt-3"
                                type="submit"
                            >
                                Send Reset Link
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPasswordForm;
