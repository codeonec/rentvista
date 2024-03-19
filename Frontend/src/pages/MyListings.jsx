import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useLogin } from "../contexts/login-context"
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const MyListings = () => {
    const { currentUser, authToken } = useLogin();
    const [userListings, setUserListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserListings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listing/auth/user-listing/${currentUser._id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
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
    }, [authToken, currentUser._id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container className="my-3">
            <h4>My Listings ({userListings.length})</h4>
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4 my-2">
                {userListings.map((listing) => (
                    <Col key={listing._id} className="my-3">
                        <Link to={`/listing/${listing._id}`} className="text-decoration-none text-dark">
                            <Card className="h-100 cursor-pointer">
                                <Card.Img
                                    variant="top"
                                    src={"http://localhost:5000/assets/listings/" + (listing.imageUrls[0])}
                                    alt={listing.title}
                                    style={{
                                        objectFit: "cover",
                                        height: "200px",
                                        borderTopLeftRadius: "5px",
                                        borderTopRightRadius: "5px"
                                    }}
                                />
                                <Card.Body className="d-flex justify-content-between flex-column">
                                    <Card.Text>{listing.title}</Card.Text>
                                    <Card.Text>
                                        <span className="fw-semibold">${listing.discountPrice}{" "}</span>
                                        <span className="text-decoration-line-through">${listing.regularPrice}</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default MyListings