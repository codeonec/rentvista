const Listing = require("../../models/Listing");
const User = require("../../models/User");

const createListing = async (req, res) => {
    try {
        const filenames = req.files.map(file => file.filename);

        const listing = await Listing.create({
            ...req.body,
            userRef: req.user.userId,
            imageUrls: filenames
        });

        res.json({ listing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { createListing };