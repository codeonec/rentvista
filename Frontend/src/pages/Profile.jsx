import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setJwtToken(token);

        if (token) {
            fetch("http://localhost:5000/user/auth/profile", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Failed to fetch profile data");
                    }
                })
                .then((data) => {
                    console.log({ data });
                    setProfileData(data.user);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);

    const getGreeting = () => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        if (currentHour < 12) {
            return 'Good morning';
        } else if (currentHour < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    };

    return (
        <>
            <Container>
                {jwtToken ?
                    profileData ?
                        <>
                            <h2 className="my-4">{getGreeting()}, {profileData.username}!</h2>
                            <div className="d-flex align-items-center gap-4">
                                <div>
                                    <p><b>Username:</b> {profileData.username}</p>
                                    <p><b>Name:</b> {profileData.firstname} {profileData.lastname}</p>
                                    <p><b>Email:</b> {profileData.email}</p>
                                    <p><b>Account Type:</b> {profileData.accountType}</p>
                                </div>
                                <img
                                    className="rounded-circle mx-5"
                                    src={"http://localhost:5000" + profileData.profilePicture}
                                    alt="user"
                                    style={{ width: "200px" }}
                                />
                            </div>
                        </>
                        : <p>Loading...</p>
                    : <p>Welcome Guest, Please LOGIN!</p>}
            </Container>
        </>
    );
}

export default Profile;
