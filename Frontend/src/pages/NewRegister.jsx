import { useFormik } from 'formik';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registrationSchema } from '../utils/formSchemas/registrationSchema';
import { z } from 'zod';
import { useState } from 'react';

const NewRegister = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const registerUser = async (values) => {
        try {
            const response = await fetch(
                "http://localhost:5000/user/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                formik.resetForm();
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                console.error("Registration failed:", data.error);
                setError(data.error);
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("An Error Occurred");
            setSuccess(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            accountType: "",
        },
        onSubmit: (values) => registerUser(values),
        validate: values => {
            try {
                registrationSchema.parse(values);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return error.formErrors.fieldErrors;
                }
            }
        }

    });

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md="5">
                    {success && (
                        <Alert variant="success">
                            Registration Successful.
                        </Alert>
                    )}

                    {error && <Alert variant="danger">{error}.</Alert>}
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={formik.values.username}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger my-1">{formik.touched.username && formik.errors.username}</p>
                        </Form.Group>
                        <Row>
                            <Col>

                                <Form.Group
                                    controlId="firstname"
                                    className="mt-3"
                                >
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter fist name"
                                        value={formik.values.firstname}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-danger my-1">{formik.touched.firstname && formik.errors.firstname}</p>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    controlId="lastname"
                                    className="mt-3"
                                >
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        value={formik.values.lastname}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <p className="text-danger my-1">{formik.touched.lastname && formik.errors.lastname}</p>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger my-1">{formik.touched.email && formik.errors.email}</p>
                        </Form.Group>

                        <Form.Group
                            controlId="password"
                            className="mt-3"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <p className="text-danger my-1">{formik.touched.password && formik.errors.password}</p>
                        </Form.Group>

                        <Form.Group
                            controlId="accountType"
                            className="mt-3"
                        >
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={formik.values.accountType}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            >
                                <option value="Property Owner">
                                    Property Owner
                                </option>
                                <option value="Traveler">Traveler</option>
                            </Form.Control>
                            <p className="text-danger my-1">{formik.touched.accountType && formik.errors.accountType}</p>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3 w-100"
                        >
                            Register
                        </Button>

                        <p className="mt-3">
                            Already a member?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default NewRegister