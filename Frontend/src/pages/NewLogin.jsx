import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginSchema } from "../utils/formSchemas/loginSchema";
import { Alert, Button, Col, Container, Row, Form } from "react-bootstrap";
import { useState } from "react";
import { useLogin } from "../contexts/login-context";

const NewLogin = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setIsLoggedIn, setCurrentUser, setLocalStorageItem, removeLocalStorageItem } = useLogin();
    const navigate = useNavigate();
    const location = useLocation();

    const loginUser = async (values) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                setLocalStorageItem("token", data.token);
                setIsLoggedIn(true);

                setLocalStorageItem("currentUser", data.user);
                setCurrentUser(data.user);

                removeLocalStorageItem("adminToken");

                setLoading(false);
                setSuccess(true);
                formik.resetForm();

                const from = location?.state?.from?.pathname || "/";

                setTimeout(() => {
                    navigate(from, { replace: true });
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

    const handleLoginTest = () => {
        const values = {
            email: "testuser@urbannest.com",
            password: "TestUser@1",
        };

        loginUser(values);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => loginUser(values),
        validate: (values) => {
            try {
                loginSchema.parse(values);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return error.formErrors.fieldErrors;
                }
            }
        },
    });

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md="4">
                    {success && (
                        <Alert variant="success">Login Successful.</Alert>
                    )}
                    {error && <Alert variant="danger">{error}.</Alert>}
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger my-1">
                                {formik.touched.email && formik.errors.email}
                            </p>
                        </Form.Group>

                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger my-1">
                                {formik.touched.password &&
                                    formik.errors.password}
                            </p>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3 w-100"
                        >
                            {loading
                                ? "Loading..."
                                : "Login"
                            }
                        </Button>

                        <Button
                            variant="primary"
                            className="mt-3 w-100"
                            onClick={handleLoginTest}
                        >
                            {loading
                                ? "Loading..."
                                : "Login Test Credential"
                            }
                        </Button>

                        <p className="mt-3">
                            Not a member? <Link to="/register">Register</Link>
                        </p>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default NewLogin;
