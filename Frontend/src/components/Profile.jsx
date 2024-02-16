import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));

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

    return (
        <>
            <Container>
                <h5 className="my-4">Profile</h5>
                {profileData ? (
                    <div>
                        <p><b>Username:</b> {profileData.username}</p>
                        <p><b>Name:</b> {profileData.firstname} {profileData.lastname}</p>
                        <p><b>Email:</b> {profileData.email}</p>
                        <p><b>Account Type:</b> {profileData.accountType}</p>
                    </div>
                ) : (
                    <p>Welcome Guest, Please LOGIN!</p>
                )}
            </Container>

        </>
    );
}

export default Profile;
