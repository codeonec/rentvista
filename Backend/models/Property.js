const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String },
    location: {
        address: { type: String },
        city: { type: String },
        country: { type: String },
    },
    amenities: [{ type: String }],
    pricePerNight: { type: Number },
    availabilityCalendar: {
        startDate: { type: Date },
        endDate: { type: Date },
    },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
