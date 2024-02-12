const express = require("express");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

// const URI = "mongodb+srv://rpatel0083:UrbanNest1@urbannest.3gm8btz.mongodb.net/?retryWrites=true&w=majority"; 
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
