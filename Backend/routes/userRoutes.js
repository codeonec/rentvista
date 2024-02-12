const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

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

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            "loas9(@(8hlhasf(((n23hlknha*nnaonouiasd*(723988BIAUDHF"
        );

        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/auth", authMiddleware, async (req, res) => {
    try {
        console.log("req.user: ", req.user);
        const userId = req.user.userId;

        const user = await User.findById(userId);

        res.json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
