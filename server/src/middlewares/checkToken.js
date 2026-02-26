const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    try {
        const token = req.cookies.user_token;       
        if (!token) {
            return res.status(400).json({ message: "Login required" });
        }
        const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);
        req.access = verifyToken;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = checkToken;