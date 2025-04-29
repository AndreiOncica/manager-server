const express = require('express');
const app = express();
const { connection } = require('./config/db'); // Assuming the database connection is in config/db.js

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.post('/data', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', data });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching users');
        } else {
            res.json(results);
        }
    });
});

// Export the app
module.exports = app;
