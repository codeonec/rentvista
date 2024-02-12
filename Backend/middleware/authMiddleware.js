const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    console.log(token);

    if (!token) {
        return res
            .status(401)
            .json({ error: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(
            token,
            "loas9(@(8hlhasf(((n23hlknha*nnaonouiasd*(723988BIAUDHF"
        );

        req.user = decoded;

        console.log("decoded token: ", decoded);

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};

module.exports = authMiddleware;
