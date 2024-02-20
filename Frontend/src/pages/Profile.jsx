import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ProfileLabel from "../components/ProfileLabel";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getGreeting from "../utils/greeting";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
                    setOriginalData(data.user);
                })

            }
        } catch (error) {
            console.error("Error:", error);
        }
    }, []);

    const editProfile = () => {
        setIsEditing(true);
    }

    const saveProfile = () => {
        if (profileData === originalData) {
            try {
                if (jwtToken) {
                    fetch(`http://localhost:5000/user/auth/edit-profile`, {
                        method: "POST",
                        headers: {
                            authorization: `Bearer ${jwtToken}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(profileData)
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
                console.error(error);
            }
        }
        setIsEditing(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <Container>
                {jwtToken ?
                    profileData ?
                        <>
                            <h2 className="my-4">{getGreeting()}, {profileData.firstname}!</h2>
                            <div className="d-flex align-items-center gap-4">
                                <Form className="my-3">
                                    <ProfileLabel
                                        label="Username"
                                        name="username"
                                        value={profileData.username}
                                        onHandleChange={handleChange}
                                        isDisabled={!isEditing}
                                    />
                                    <ProfileLabel
                                        label="First Name"
                                        name="firstname"
                                        value={profileData.firstname}
                                        onHandleChange={handleChange}
                                        isDisabled={!isEditing}
                                    />
                                    <ProfileLabel
                                        label="Last Name"
                                        name="lastname"
                                        value={profileData.lastname}
                                        onHandleChange={handleChange}
                                        isDisabled={!isEditing}
                                    />
                                    <ProfileLabel
                                        label="Email"
                                        name="email"
                                        value={profileData.email}
                                        onHandleChange={handleChange}
                                        isDisabled={!isEditing}
                                    />
                                    <ProfileLabel
                                        label="Account Type"
                                        name="accountType"
                                        value={profileData.accountType}
                                        onHandleChange={handleChange}
                                        isDisabled={!isEditing}
                                    />
                                    <Button
                                        variant="primary"
                                        className="w-100"
                                        onClick={!isEditing ? editProfile : saveProfile}
                                    >
                                        {!isEditing ? "Edit" : "Save "}
                                    </Button>
                                </Form>
                                <img
                                    className="rounded-circle mx-5"
                                    src={"http://localhost:5000" + profileData.profilePicture}
                                    alt="user"
                                    style={{ width: "200px" }}
                                />
                            </div>
                        </>
                        : <Loading />
                    : <p className="my-3">Welcome Guest, Please LOGIN!</p>}
            </Container>
        </>
    );
}

export default Profile;
