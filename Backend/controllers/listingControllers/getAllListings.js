const Listing = require("../../models/Listing");

const getAllListings = async (req, res) => {
    try {
        const listing = await Listing.find();

        res.status(200).json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getAllListings };
