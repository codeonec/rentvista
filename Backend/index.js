const express = require("express");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

mongoose
    .connect(
        "mongodb+srv://rpatel0083:UrbanNest1@urbannest.3gm8btz.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
