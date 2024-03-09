const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createListing } = require("../controllers/listingControllers/createListing");

const router = express.Router();

router.post("/create-listing", authMiddleware, createListing);

module.exports = router;