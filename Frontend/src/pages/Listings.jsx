import { useEffect, useState } from "react"
import { Container, Row } from 'react-bootstrap';
import Loading from "../components/Loading";
import ListingComponent from "../components/ListingComponent";
import { useParams } from "react-router-dom";

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { type } = useParams();

    useEffect(() => {
        const getListings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listing/get/all-listings/`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user listings');
                }

                const data = await response.json();

                setListings(data);
                setIsLoading(false);
                setError("");
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
                setError("Please try again! Facing problem with server");
            }
        };

        getListings();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const typeListings = listings
        .filter(listing => listing.type === type);

    return (
        <Container className="my-3">
            <h4>Available Listings for {type === "sell" ? "Sell" : "Rent"} ({typeListings.length})</h4>
            {error && <div className="fw-semibold fs-3">{error}</div>}
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4 my-2">
                {typeListings.map(listing => (
                    <ListingComponent listing={listing} key={listing._id} />
                ))
                }
            </Row>
        </Container>
    )
}

export default Listings