const Listing = require("../../models/Listing");

const createListing = async () => {
    try {
        const listing = await Listing.create(req.body);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { createListing };