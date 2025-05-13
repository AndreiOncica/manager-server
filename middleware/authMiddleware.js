import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const token = req.cookies.token; // Retrieve token from cookies

    if (!token) {
        return res.status(403).json({ error: 'Access denied: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user; // Attach user info to the request
        next(); // Proceed to next middleware or route handler
    });
}



export default authenticateToken
