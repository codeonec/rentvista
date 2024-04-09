const User = require("../../models/User");

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...rest } = user._doc;

        res.json({ user: rest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getUser }
