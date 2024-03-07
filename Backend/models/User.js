const mongoose = require("mongoose");
const DEFAULT_USER = "default-user.png";


const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: DEFAULT_USER },
    accountType: {
        type: String,
        enum: ["Property Owner", "Traveler"],
        required: true,
    },
    registrationDate: { type: Date, default: Date.now },
    resetToken: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
