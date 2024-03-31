const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/availability/:propertyId", authMiddleware, async (req, res) => {
    try {
        const { propertyId } = req.params;
        const { startDate, endDate } = req.query;

        // Query the database to find bookings for the property within the requested date range
        const bookings = await Booking.find({
            propertyID: propertyId,
            checkInDate: { $lt: endDate },
            checkOutDate: { $gt: startDate },
        });

        // Extract booked dates from bookings
        const bookedDates = [];
        bookings.forEach((booking) => {
            const { checkInDate, checkOutDate } = booking;
            const currentDate = new Date(checkInDate);
            while (currentDate < new Date(checkOutDate)) {
                bookedDates.push(currentDate.toISOString().split("T")[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        // Determine available dates
        const availableDates = [];
        let currentDate = new Date(startDate);
        while (currentDate < new Date(endDate)) {
            const currentDateISO = currentDate.toISOString().split("T")[0];
            if (!bookedDates.includes(currentDateISO)) {
                availableDates.push(currentDateISO);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Send available dates as response
        res.status(200).json({ availableDates });
    } catch (error) {
        console.error("Error getting available dates:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/new", authMiddleware, async (req, res) => {
    try {
        const { userID, propertyID, checkInDate, checkOutDate, totalPrice } =
            req.body;

        // Create a new booking
        const newBooking = new Booking({
            userId: userID,
            propertyId: propertyID,
            checkInDate,
            checkOutDate,
            totalPrice,
            bookingStatus: "Confirmed",
        });

        // Save the booking to the database
        await newBooking.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        // Retrieve user ID from request
        const userID = req.user.userId; // Assuming you have implemented authentication middleware

        // Find bookings associated with the user ID
        const bookings = await Booking.find({ userId: userID });
        console.log({ bookings, userID });

        res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
