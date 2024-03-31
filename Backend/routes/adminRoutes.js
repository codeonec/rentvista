const express = require("express");
const router = express.Router();
// const adminController = require('../controllers/adminController');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Listing = require("../models/Listing");
const requireAdminAuth = require("../middleware/adminAuthMiddleware");

router.get("/listings", async (req, res) => {
    try {
        // Fetch all listings from the database
        const listings = await Listing.find();

        // Send the listings as a response
        res.status(200).json(listings);
    } catch (error) {
        // If there's any error, send an error response
        console.error("Error fetching listings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.put("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            address,
            regularPrice,
            discountPrice,
            type,
            bedrooms,
            bathrooms,
            furnished,
            parking,
            gym,
            imageUrls,
            userRef,
        } = req.body;

        // Find the listing by ID
        let listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }

        // Update listing properties
        listing.title = title;
        listing.description = description;
        listing.address = address;
        listing.regularPrice = regularPrice;
        listing.discountPrice = discountPrice;
        listing.type = type;
        listing.bedrooms = bedrooms;
        listing.bathrooms = bathrooms;
        listing.furnished = furnished;
        listing.parking = parking;
        listing.gym = gym;
        listing.imageUrls = imageUrls;
        listing.userRef = userRef;

        // Save the updated listing
        await listing.save();

        // Send success response
        res.status(200).json({
            message: "Listing updated successfully",
            listing,
        });
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await Listing.findByIdAndDelete(id);

        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/users", requireAdminAuth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.put("/users/:id", requireAdminAuth, async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username, email, accountType } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { firstname, lastname, username, email, accountType },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID and remove it from the database
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            // If the user with the given ID doesn't exist
            return res.status(404).json({ error: "User not found" });
        }

        // Send a success response
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        // If there's any error, send an error response
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Hardcoded admin credentials (for testing only)
const hardcodedAdminUsername = "admin";
const hardcodedAdminPassword = "password";

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (
            username !== hardcodedAdminUsername ||
            password !== hardcodedAdminPassword
        ) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { username: hardcodedAdminUsername },
            "urbannestjwtadmin"
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

module.exports = router;
