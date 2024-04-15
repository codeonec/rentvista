import { useEffect, useState } from "react"
import { Container, Row } from 'react-bootstrap';
import { useLogin } from "../contexts/login-context"
import Loading from "../components/Loading";
import ListingComponent from "../components/ListingComponent";

const MyListings = () => {
    const { currentUser } = useLogin();
    const [userListings, setUserListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserListings = async () => {
            const token = JSON.parse(localStorage.getItem("token"));

            try {
                const response = await fetch(`${import.meta.env.VITE_URBANNEST_API}/listing/auth/get/user-listings/${currentUser._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user listings');
                }
                const data = await response.json();
                setUserListings(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
            }
        };

        getUserListings();
    }, [currentUser._id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container className="my-3">
            <h4>My Listings ({userListings.length})</h4>
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4 my-2">
                {userListings.map((listing) => (
                    <ListingComponent listing={listing} key={listing._id} />
                ))}
            </Row>
        </Container>
    )
}

export default MyListings