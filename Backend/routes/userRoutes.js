const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { userRegister } = require("../controllers/userRegister");
const { userLogin } = require("../controllers/userLogin");
const { userProfile } = require("../controllers/userProfile");
const { userEditProfile } = require("../controllers/userEditProfile");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/auth/profile", authMiddleware, userProfile);
router.post("/auth/edit-profile", authMiddleware, userEditProfile);

module.exports = router;
