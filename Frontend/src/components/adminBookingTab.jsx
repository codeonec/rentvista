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

const AdminBookingTab = () => {
    const [bookings, setBookings] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const adminToken = JSON.parse(localStorage.getItem("adminToken"));
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBooking();
    }, []);

    const handleEdit = (booking) => {
        setSelectedBooking(booking);
        setShowEditModal(true);
    };
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedBooking(null);
    };

    const handleDelete = async (bookingId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/admin/bookings/${bookingId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: adminToken,
                    },
                }
            );
            if (response.ok) {
                const updatedBooking = bookings.filter(
                    (b) => b._id !== bookingId
                );
                setBookings(updatedBooking);
            } else {
                setError("Failed to delete booking");
                console.error("Failed to delete booking:", response.statusText);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error deleting booking:", error.message);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/admin/bookings/${selectedBooking._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: adminToken,
                    },
                    body: JSON.stringify(selectedBooking),
                }
            );
            if (response.ok) {
                const updatedBooking = bookings.map((b) =>
                    b._id === selectedBooking._id ? selectedBooking : b
                );
                setBookings(updatedBooking);
                handleCloseEditModal();
            } else {
                setError("Failed to update booking");
                console.error("Failed to update booking:", response.statusText);
            }
        } catch (error) {
            setError(error.message);
            console.error("Error updating booking:", error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedBooking({ ...selectedBooking, [name]: value });
    };

    const fetchBooking = async () => {
        setError("");
        try {
            const response = await fetch(
                "http://localhost:5000/admin/bookings",
                {
                    headers: {
                        Authorization: adminToken,
                    },
                }
            );
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching listings:", error);
            setError(error);
        }
    };

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {error && <Alert variant="danger">{error}.</Alert>}

                        <h2 className="mb-3">Bookings</h2>
                        <div className="overflow-hidden rounded-3 border">
                            <Table className="rounded-4 mb-0" striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User ID</th>
                                        <th>Property ID</th>
                                        <th>Check-in Date</th>
                                        <th>Check-out Date</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={booking._id}>
                                            <td>{index + 1}</td>
                                            <td>{booking.userId}</td>
                                            <td>{booking.propertyId}</td>
                                            <td>
                                                {new Date(
                                                    booking.checkInDate
                                                ).toLocaleDateString("en-CA")}
                                            </td>
                                            <td>
                                                {new Date(
                                                    booking.checkOutDate
                                                ).toLocaleDateString("en-CA")}
                                            </td>
                                            <td>{booking.totalPrice}</td>
                                            <td>{booking.bookingStatus}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="px-3"
                                                        onClick={() =>
                                                            handleEdit(booking)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                booking._id
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
                            {/* Edit Modal */}
                            {selectedBooking && (
                                <Modal
                                    show={showEditModal}
                                    onHide={handleCloseEditModal}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Booking</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="checkInDate">
                                                <Form.Label>
                                                    Check-in Date
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="checkInDate"
                                                    value={
                                                        new Date(
                                                            selectedBooking.checkInDate
                                                        )
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="checkOutDate">
                                                <Form.Label>
                                                    Check-out Date
                                                </Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="checkOutDate"
                                                    value={
                                                        new Date(
                                                            selectedBooking.checkOutDate
                                                        )
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="totalPrice">
                                                <Form.Label>
                                                    Total Price
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="totalPrice"
                                                    value={
                                                        selectedBooking.totalPrice
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="status">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="bookingStatus"
                                                    value={
                                                        selectedBooking.bookingStatus
                                                    }
                                                    onChange={handleInputChange}
                                                >
                                                    <option>Pending</option>
                                                    <option>Confirmed</option>
                                                    <option>Cancelled</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            variant="secondary"
                                            onClick={handleCloseEditModal}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={handleSaveChanges}
                                        >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminBookingTab;
