const User = require("../../models/User");

const userEditProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = {
            ...req.body,
            profilePicture: req.file?.filename
                ? req.file.filename
                : user.profilePicture
        };

        Object.assign(user, updatedUser);
        await user.save();

        res.json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { userEditProfile }
