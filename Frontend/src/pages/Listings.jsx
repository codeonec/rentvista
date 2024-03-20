import { useEffect, useState } from "react"
import { Container, Row } from 'react-bootstrap';
import Loading from "../components/Loading";
import ListingComponent from "../components/ListingComponent";

const Listings = () => {
    const [Listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getListings = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listing/all-listings/`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user listings');
                }

                const data = await response.json();
                setListings(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
            }
        };

        getListings();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container className="my-3">
            <h4>Available Listings ({Listings.length})</h4>
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4 my-2">
                {Listings.map((listing) => (
                    <ListingComponent listing={listing} key={listing._id} />
                ))}
            </Row>
        </Container>
    )
}

export default Listings