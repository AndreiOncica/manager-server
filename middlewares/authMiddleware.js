// middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Check for authentication token in cookies
    if (token) {
        return res.redirect("/dashboard"); // Redirect if logged in
    }
    next(); // Continue to the login route if not authenticated
};

module.exports = authMiddleware;
