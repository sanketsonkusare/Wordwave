const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.user = { id: decoded.id, username: decoded.username };  // ✅ Include username

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;

