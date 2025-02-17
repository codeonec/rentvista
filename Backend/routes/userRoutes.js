const express = require("express");
const multer = require('multer');

const authMiddleware = require("../middleware/authMiddleware");
const { userRegister } = require("../controllers/userControllers/userRegister");
const { userLogin } = require("../controllers/userControllers/userLogin");
const { userProfile } = require("../controllers/userControllers/userProfile");
const { userEditProfile } = require("../controllers/userControllers/userEditProfile");
const { forgotPassword, resetPassword } = require("../controllers/userControllers/userPasswordReset");
const { getUser } = require("../controllers/userControllers/getUser");

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
router.get("/:id", getUser);
router.post("/auth/edit-profile", authMiddleware, upload.single("profilePicture"), userEditProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
