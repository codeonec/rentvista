const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    accountType: {
        type: String,
        enum: ["Property Owner", "Traveler"],
        required: true,
    },
    registrationDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
