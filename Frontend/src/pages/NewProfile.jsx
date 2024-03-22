import Loading from "../components/Loading";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import getGreeting from "../utils/greeting";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../contexts/login-context";

const NewProfile = () => {
    const { currentUser } = useLogin();
    const navigate = useNavigate();

    if (!currentUser) {
        return (
            <Container>
                <Loading />
            </Container>
        )
    }

    const { username, firstname, lastname, email, accountType, profilePicture } = currentUser;

    // eslint-disable-next-line react/prop-types
    const TextWithLabel = ({ label, text }) => {
        return (
            <div className=" my-3">
                <Col>
                    <Form.Label className="fw-semibold">{label}</Form.Label>
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
            <h4 className="py-4">{getGreeting()}! {firstname} </h4>

            <Row>
                <Col md={6}>
                    <TextWithLabel label={"Username"} text={username} />
                    <Row md={2}>
                        <TextWithLabel label={"First Name"} text={firstname} />
                        <TextWithLabel label={"Last Name"} text={lastname} />
                    </Row>
                    <TextWithLabel label={"Email"} text={email} />
                    <TextWithLabel label={"Account Type"} text={accountType} />
                    <Button
                        className="w-100 my-2"
                        onClick={() => {
                            navigate("/edit-profile", { state: currentUser });
                        }}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        variant="success"
                        className="w-100 my-2"
                        onClick={() => {
                            navigate("/create-listing");
                        }}
                    >
                        Create new listing
                    </Button>
                </Col>

                <Col md={4} className="d-flex justify-content-center align-items-start">
                    <img
                        src={"http://localhost:5000/assets/uploads/" + profilePicture}
                        alt="profile photo"
                        className="m-4 my-4 shadow-sm"
                        style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default NewProfile;
