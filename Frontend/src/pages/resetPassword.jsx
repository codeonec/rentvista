// ResetPasswordPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ResetPasswordPage = () => {
    // const location = useLocation();
    const token = new URLSearchParams(window.location.search).get('token');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            // Send a request to the backend to reset the password
            const response = await fetch(
                "http://localhost:5000/user/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token, newPassword }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log("Password reset successful:", data.message);
                setResetSuccess(true);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                console.error("Password reset failed:", data.error);
                // Handle password reset failure, display an error message, etc.
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            // Handle unexpected errors
        }
    };

    return (
        <div>
            {resetSuccess ? (
                <p>Password reset successful! Redirecting...</p>
            ) : (
                <Container>
                    <Row className="justify-content-center">
                        <Col md="4" className="py-5">
                            <Form onSubmit={handleResetPassword}>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="mt-3">
                                    Reset Password
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default ResetPasswordPage;
