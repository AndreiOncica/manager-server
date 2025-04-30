const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Import your database connection
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Assuming the username & password come in the request body

    try {
        // Check if the user exists in the database
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If passwords match, login is successful
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

module.exports = router;
