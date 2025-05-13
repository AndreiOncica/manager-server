import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,   // Prevents access from JavaScript
            secure: process.env.NODE_ENV === 'production',  // Use secure flag in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
}

function getLoginPage(req, res) {
    const token = req.cookies.token; // Assuming you're using cookies for authentication

    if (token) {
        return res.redirect("/dashboard"); // Redirect logged-in users
    }

    res.sendFile("login.html", { root: "./public" }); // Serve the login page
}

export { loginUser, getLoginPage };