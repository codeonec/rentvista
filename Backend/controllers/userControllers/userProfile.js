const User = require("../../models/User");

const userProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        const { password, ...rest } = user._doc;

        res.json({ user: rest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { userProfile }
