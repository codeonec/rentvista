const User = require("../../models/User");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
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
}

module.exports = { userRegister }