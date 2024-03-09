import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../components/Loading";

const EditProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setJwtToken(token);

        try {
            if (token) {
                fetch("http://localhost:5000/user/auth/profile", {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Failed to fetch profile data");
                    }
                }).then((data) => {
                    setProfileData(data.user);
                    setFormData(data.user)
                })
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }, []);

    if (!jwtToken) {
        return (
            <Container>
                <p className="my-3">Welcome Guest, Please {" "}
                    <Link to="/login">
                        LOGIN!
                    </Link>
                </p>
            </Container>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstname, lastname, email, accountType } = formData;
        const fileFormData = new FormData();

        fileFormData.append("profilePicture", profilePicture);
        fileFormData.append("firstname", firstname);
        fileFormData.append("lastname", lastname);
        fileFormData.append("email", email);
        fileFormData.append("accountType", accountType);

        try {
            if (jwtToken) {
                const response = await fetch(`http://localhost:5000/user/auth/edit-profile`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                    },
                    body: fileFormData
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log({ data });
                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/profile");
                    }, 2000);
                } else {
                    throw new Error("Failed to edit profile data");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    if (!profileData) {
        return (
            <Container>
                <Loading />
            </Container>
        )
    }

    const { username, firstname, lastname, email, accountType } = formData;

    return (
        <Container>
            <h4 className="py-4">Edit Profile</h4>

            <Row className="justify-content-md-left">
                <Col md={6}>
                    {success && (
                        <Alert variant="success">
                            Profile Edited Successful.
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label className="fw-semibold">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                    required
                                    disabled
                                    className="bg-light"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label className="fw-semibold">First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstname"
                                    value={firstname}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Label className="fw-semibold">Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastname"
                                    value={lastname}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label className="fw-semibold">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label className="fw-semibold">Account Type</Form.Label>
                                <Form.Select
                                    name="accountType"
                                    value={accountType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Property Owner">Property Owner</option>
                                    <option value="Traveler">Traveler</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label className="fw-semibold">Profile Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    name="profilePicture"
                                    onChange={(event) => {
                                        setProfilePicture(event.target.files[0]);
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="my-2">
                            <Col md={4} className="my-2">
                                <Button
                                    variant="secondary"
                                    className="w-100"
                                    onClick={() => {
                                        navigate("/profile");
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                            <Col md={8} className="my-2">
                                <Button variant="primary" className="w-100" type="submit">
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProfile