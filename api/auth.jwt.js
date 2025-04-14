const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // No token provided
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
        if (err) {
            // Differentiate between token types
            const errorMessage = err.name === 'TokenExpiredError' 
                ? "Session expired. Please log in again." 
                : "Invalid token. Access denied.";
            
            return res.status(403).json({ message: errorMessage });
        }
        
        // Attach user data to request object
        req.user = userData;
        next();
    });
};

module.exports = authenticateToken;
