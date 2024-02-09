const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { firstname, lastname, username, email, password, accountType } =
        req.body;

    try {
        // Check if the user already exists with the given email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "User with this email already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            accountType,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            firstname,
            lastname,
            username,
            email,
            accountType,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    // Implement user login logic here

    // For example:
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Create and sign a JWT for authentication
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            "yourSecretKey", // Change this to a secret key for production
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
