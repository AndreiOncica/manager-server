const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { connection } = require('./config/db'); // Assuming the database connection is in config/db.js
const apiRoutes = require('./routes/api');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173/', // Allow requests only from this origin
    methods: ['GET', 'POST'],        // Specify allowed HTTP methods
    credentials: true                // Include cookies or authorization headers (if needed)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRoutes);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route for serving React's `index.html`

// This ensures React Router handles front-end routes
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// Export the app
module.exports = app;
