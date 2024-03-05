const express = require("express");
const multer = require('multer');

const authMiddleware = require("../middleware/authMiddleware");
const { userRegister } = require("../controllers/userRegister");
const { userLogin } = require("../controllers/userLogin");
const { userProfile } = require("../controllers/userProfile");
const { userEditProfile } = require("../controllers/userEditProfile");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/auth/profile", authMiddleware, userProfile);
router.post("/auth/edit-profile", authMiddleware, upload.single("profilePicture"), userEditProfile);

module.exports = router;
