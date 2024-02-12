import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:5000/user/auth", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
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
                    setProfileData(data);
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
                        <p>Name: {profileData.name}</p>
                    </div>
                ) : (
                    <p>Welcome ...</p>
                )}
            </Container>
        </>
    );
}

export default Profile;
