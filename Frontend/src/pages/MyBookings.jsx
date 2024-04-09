import { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const authToken = JSON.parse(localStorage.getItem("token"));

    const fetchBookings = async () => {
        try {
            const response = await fetch("http://localhost:5000/booking", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(data.bookings);
            } else {
                console.error("Failed to fetch bookings:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error.message);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <Container className="pt-5">
            <h1 className="mb-3">My Bookings</h1>
            <ListGroup>
                {bookings.map((booking) => (
                    <ListGroup.Item key={booking._id}>
                        <strong>Property: </strong> {booking.propertyId}<br />
                        <strong>Check In: </strong>{new Date(booking.checkInDate).toLocaleDateString()} <strong>Check Out: </strong> {new Date(booking.checkOutDate).toLocaleDateString()}<br />
                        <strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleDateString()} at {new Date(booking.bookingDate).toLocaleTimeString()}<br />
                        <strong>Status:</strong> {booking.bookingStatus}

                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default MyBookings;
