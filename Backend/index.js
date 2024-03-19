const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the 'assets' folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use("/user", userRoutes);
app.use("/listing", listingRoutes);
app.use("/admin", adminRoutes);

const URI = "mongodb+srv://hrshmistry:Conestoga8670@cluster0.rupceib.mongodb.net/UrbanNestDB?retryWrites=true&w=majority";

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(URI, OPTIONS)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Error connecting to MongoDB!", err));

app.listen(PORT, () => {
    console.log(`\nServer is running on http://localhost:${PORT}/\n`);
});
