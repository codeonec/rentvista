const express = require("express");
const multer = require('multer');

const authMiddleware = require("../middleware/authMiddleware");
const { createListing } = require("../controllers/listingControllers/createListing");
const { getUserListings } = require("../controllers/listingControllers/getUserListings");
const { getAllListings } = require("../controllers/listingControllers/getAllListings");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/listings')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, "listing" + file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

router.post("/auth/create", authMiddleware, upload.array('images', 5), createListing);
router.get('/auth/user-listings/:id', authMiddleware, getUserListings);
router.get('/all-listings', getAllListings);

module.exports = router;