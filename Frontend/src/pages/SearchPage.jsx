import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ListingComponent from '../components/ListingComponent';
import { Container, Row } from 'react-bootstrap';

const SearchPage = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query') || '';

    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getListings = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URBANNEST_API}/listing/get/all-listings/`);

                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }

                const data = await response.json();

                const filteredListings = data.filter(listing =>
                    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setListings(filteredListings);
                setIsLoading(false);
                setError('');
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
                setError('Please try again! Facing problem with server');
            }
        };

        getListings();
    }, [searchQuery]);

    return (
        <Container className='p-3'>
            {searchQuery === ""
                ? <h5>Showing all available listings ({listings.length})</h5>
                : <h5>Search Results for "{searchQuery}" ({listings.length})</h5>
            }
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : listings.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4 my-2">
                    {listings.map(listing => (
                        <ListingComponent key={listing.id} listing={listing} />
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default SearchPage;
