const Listing = require("../../models/Listing");

const getUserListing = async (req, res) => {
    if (req.user.userId === req.params.id) {
        const listing = await Listing.find({ userRef: req.params.id });

        res.status(200).json(listing);
    } else {
        res.status(401).json({ error: "Unauthorized User" });
    }
}

module.exports = { getUserListing };
