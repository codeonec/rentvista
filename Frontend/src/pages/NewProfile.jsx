import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import getGreeting from "../utils/greeting";
import { Link, useNavigate } from "react-router-dom";

const NewProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);
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

    if (!profileData) {
        return (
            <Container>
                <Loading />
            </Container>
        )
    }

    const { username, firstname, lastname, email, accountType, profilePicture } = profileData;
    const fullname = `${firstname} ${lastname}`;

    // eslint-disable-next-line react/prop-types
    const TextWithLabel = ({ label, text }) => {
        return (
            <div className=" my-3">
                <Col>
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        type="text"
                        value={text}
                        disabled
                        className="bg-light"
                    />
                </Col>
            </div>
        )
    };

    return (
        <Container>
            <h4 className="py-4">{getGreeting()}! {fullname} </h4>

            <Row>
                <Col md={6}>
                    <TextWithLabel label={"Username"} text={username} />
                    <TextWithLabel label={"First Name"} text={firstname} />
                    <TextWithLabel label={"Last Name"} text={lastname} />
                    <TextWithLabel label={"Email"} text={email} />
                    <TextWithLabel label={"Account Type"} text={accountType} />
                    <Button
                        className="w-100 my-2"
                        onClick={() => {
                            navigate("/edit-profile", { state: profileData });
                        }}
                    >
                        Edit Profile
                    </Button>
                </Col>

                <Col md={4} className="d-flex justify-content-center align-items-start">
                    <img
                        src={"http://localhost:5000/assets/uploads/" + profilePicture}
                        alt="profile photo"
                        className="m-2 shadow border"
                        style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%" }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default NewProfile;
