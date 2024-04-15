import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table,
} from "react-bootstrap";

const AdminListingTab = () => {
    const [listings, setListings] = useState([]);
    const adminToken = JSON.parse(localStorage.getItem("adminToken"));
    const [selectedListing, setSelectedListing] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setError("");
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URBANNEST_API}/admin/listings`,
                {
                    headers: {
                        Authorization: adminToken,
                    },
                }
            );
            const data = await response.json();
            setListings(data);
        } catch (error) {
            console.error("Error fetching listings:", error);
            setError(error);
        }
    };

    const handleEditListing = (listing) => {
        setSelectedListing(listing);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedListing(null);
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedListing({ ...selectedListing, [name]: value });
    };
    const handleChangeNumeric = (e) => {
        const { name, value } = e.target;
        setSelectedListing({ ...selectedListing, [name]: parseFloat(value) });
    };

    const handleSubmit = async () => {
        setError("");
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URBANNEST_API}/admin/listings/${selectedListing._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: adminToken,
                    },
                    body: JSON.stringify(selectedListing),
                }
            );

            if (response.ok) {
                const updatedListings = listings.map((l) =>
                    l._id === selectedListing._id ? selectedListing : l
                );
                setListings(updatedListings);

                handleCloseModal();
            } else {
                setError("An error occurred");
            }
        } catch (error) {
            setError(error);
        }
    };

    const handleDeleteListing = async (id) => {
        setError("");
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URBANNEST_API}/admin/listings/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: adminToken,
                    },
                }
            );

            if (response.ok) {
                const updatedListings = listings.filter(
                    (listing) => listing._id !== id
                );
                setListings(updatedListings);
            } else {
                // Handle error response
            }
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    {error && <Alert variant="danger">{error}.</Alert>}

                    <h2 className="mb-3">Listings</h2>
                    <div className="overflow-hidden rounded-3 border">
                        <Table className="rounded-4 mb-0" striped hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Address</th>
                                    <th>Regular Price</th>
                                    <th>Discount Price</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listings.map((listing) => (
                                    <tr key={listing._id}>
                                        <td>{listing.title}</td>
                                        <td>{listing.description}</td>
                                        <td>{listing.address}</td>
                                        <td>{listing.regularPrice}</td>
                                        <td>{listing.discountPrice}</td>
                                        <td>{listing.type}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    className="px-3"
                                                    onClick={() =>
                                                        handleEditListing(
                                                            listing
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDeleteListing(
                                                            listing._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    {/* Edit modal */}
                    <Modal show={showModal} onHide={handleCloseModal} size="xl">
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Listing</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedListing && (
                                <Form>
                                    <Row>
                                        {selectedListing.imageUrls.map(
                                            (img, i) => (
                                                <Col key={i}>
                                                    <img
                                                        src={`${import.meta.env.VITE_URBANNEST_API}/assets/listings/${img}`}
                                                        style={{
                                                            objectFit: "cover",
                                                            height: "200px",
                                                            borderRadius: 8,
                                                            marginBottom: 16,
                                                        }}
                                                    />
                                                </Col>
                                            )
                                        )}
                                    </Row>
                                    <Row>
                                        <Form.Group
                                            controlId="title"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={selectedListing.title}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="address"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={selectedListing.address}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Form.Group
                                        controlId="description"
                                        className="mb-3"
                                        as={Col}
                                    >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            value={selectedListing.description}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Form.Group
                                            as={Col}
                                            controlId="regularPrice"
                                            className="mb-3"
                                        >
                                            <Form.Label>
                                                Regular Price
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="regularPrice"
                                                value={
                                                    selectedListing.regularPrice
                                                }
                                                onChange={handleChangeNumeric}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            controlId="discountPrice"
                                            className="mb-3"
                                        >
                                            <Form.Label>
                                                Discount Price
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="discountPrice"
                                                value={
                                                    selectedListing.discountPrice
                                                }
                                                onChange={handleChangeNumeric}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group
                                            controlId="type"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Label>Type</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="type"
                                                value={selectedListing.type}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="bedrooms"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Label>Bedrooms</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="bedrooms"
                                                value={selectedListing.bedrooms}
                                                onChange={handleChangeNumeric}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="bathrooms"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Label>Bathrooms</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="bathrooms"
                                                value={
                                                    selectedListing.bathrooms
                                                }
                                                onChange={handleChangeNumeric}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group
                                            controlId="furnished"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Check
                                                type="checkbox"
                                                label="Furnished"
                                                name="furnished"
                                                checked={
                                                    selectedListing.furnished
                                                }
                                                onChange={(e) =>
                                                    setSelectedListing({
                                                        ...selectedListing,
                                                        furnished:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="parking"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Check
                                                type="checkbox"
                                                label="Parking"
                                                name="parking"
                                                checked={
                                                    selectedListing.parking
                                                }
                                                onChange={(e) =>
                                                    setSelectedListing({
                                                        ...selectedListing,
                                                        parking:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            controlId="gym"
                                            className="mb-3"
                                            as={Col}
                                        >
                                            <Form.Check
                                                type="checkbox"
                                                label="Gym"
                                                name="gym"
                                                checked={selectedListing.gym}
                                                onChange={(e) =>
                                                    setSelectedListing({
                                                        ...selectedListing,
                                                        gym: e.target.checked,
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Form.Group
                                        controlId="userRef"
                                        className="mb-3"
                                    >
                                        <Form.Label>
                                            User ID:{" "}
                                            <strong>
                                                {selectedListing.userRef}
                                            </strong>
                                        </Form.Label>
                                    </Form.Group>
                                </Form>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={handleCloseModal}
                            >
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
};
export default AdminListingTab;
