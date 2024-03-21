const Listing = require("../../models/Listing")

const updateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }

    if (listing.userRef !== req.user.userId) {
        return res.status(401).json({ error: "Unauthorized User" });
    }

    const filenames = req.files.map(file => file.filename);

    const newData = {
        ...req.body
    };

    if (filenames.length > 0) {
        newData.imageUrls = filenames;
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            newData,
            { new: true }
        );

        res.status(200).json(updatedListing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { updateListing }