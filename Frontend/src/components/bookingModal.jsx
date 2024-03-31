import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLogin } from "../contexts/login-context";

const BookingModal = ({ showModal, onCloseModal, listingId }) => {
    const { currentUser } = useLogin();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const authToken = JSON.parse(localStorage.getItem("token"));

    const fetchAvailableDates = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/booking/availability/${listingId}`,
                {
                    method: "Get",
                    headers: {
                        authorization: `Bearer ${authToken}`,
                    },
                }
            );
            const data = await response.json();
            console.log(data);
            setAvailableDates(data.availableDates);
        } catch (error) {
            console.error("Error fetching available dates:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            // Perform validation here if needed

            // Send a request to create the booking
            const response = await fetch("http://localhost:5000/booking/new/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    userID: currentUser._id,
                    propertyID: listingId,
                    checkInDate: startDate.toISOString(),
                    checkOutDate: endDate.toISOString(),
                    totalPrice: 255,
                }),
            });

            if (response.ok) {
                // Booking created successfully
                const data = await response.json();
                console.log("Booking created:", data.booking);
                // Optionally, you can close the modal or perform other actions
                onCloseModal();
            } else {
                // Handle error response
                console.error("Error creating booking:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating booking:", error.message);
        }
    };

    useEffect(() => {
        fetchAvailableDates();
    }, []);

    return (
        <Modal show={showModal} onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Select Dates</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label>Check-in Date:</label>&nbsp;
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select check-in date"
                        filterDate={(date) =>
                            !availableDates.includes(
                                date.toISOString().split("T")[0]
                            )
                        }
                    />
                </div>
                <div>
                    <label>Check-out Date:</label>&nbsp;
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        minDate={startDate}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select check-out date"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookingModal;
