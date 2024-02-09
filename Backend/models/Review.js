const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    reviewDate: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
