const Listing = require("../../models/Listing");

const getSingleListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.status(200).json(listing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getSingleListing };