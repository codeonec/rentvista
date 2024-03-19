const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            "urbannestjwttoken"
        );

        const { password, ...rest } = user._doc;

        res.status(200).json({ message: "User logged in successfully", token, user: rest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { userLogin }
