/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLogin } from "../contexts/login-context";
import { loadStripe } from "@stripe/stripe-js";

const BookingModal = ({ showModal, onCloseModal, listingId }) => {
    const { currentUser } = useLogin();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const authToken = JSON.parse(localStorage.getItem("token"));
    const [error, setError] = useState("");

    const fetchAvailableDates = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URBANNEST_API}/booking/availability/${listingId}`,
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

    const makePayment = async () => {
        const stripe = await loadStripe(
            "pk_test_51P3lmWBbv8rvOm4IigzxbKHxPRqmv5WFkAxios0x8U7pTHAQpo1ImrHoDjHwePRMVrgkAemlK9VdCeFyApPK4Rn700TY2Bc4Yf"
        );

        const response = await fetch(
            `${import.meta.env.VITE_URBANNEST_API}/booking/create-checkout-session`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ listingId }),
            }
        );

        const session = await response.json();

        const result = stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            console.log(result.error.message);
        }
    };

    const handleSubmit = async () => {
        if (!startDate || !endDate) {
            // If either start date or end date is not selected, do not proceed
            console.log("Please select both check-in and check-out dates.");
            setError("Please select both check-in and check-out dates.");
            return;
        }
        const durationInDays = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        if (durationInDays < 30) {
            setError("Minimum booking duration is one month");
            return;
        }
        try {
            makePayment();

            const response = await fetch(`${import.meta.env.VITE_URBANNEST_API}/booking/new/`, {
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

    <Button variant="primary" onClick={handleSubmit}>
        Checkout
    </Button>;

    useEffect(() => {
        fetchAvailableDates();
    }, []);

    return (
        <Modal show={showModal} onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Select Dates</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}.</Alert>}
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
                    Checkout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookingModal;
