const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { userRegister } = require("../controllers/userRegister");
const { userLogin } = require("../controllers/userLogin");
const { userProfile } = require("../controllers/userProfile");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/auth/profile", authMiddleware, userProfile);

module.exports = router;
