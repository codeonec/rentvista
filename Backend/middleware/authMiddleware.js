const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.headers["authorization"];

    token = token.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ error: "Unauthorized - No token provided" });
    }

    try {
        token
        const decoded = jwt.verify(
            token,
            "urbannestjwttoken"
        );

        req.user = decoded;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};

module.exports = authMiddleware;
