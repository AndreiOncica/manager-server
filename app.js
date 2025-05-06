const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { connection } = require('./config/db'); // Assuming the database connection is in config/db.js
const apiRoutes = require('./routes/api');
const authMiddleware = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");

const allowedOrigins = ['http://localhost:5173', 'https://codenest.ro'];

app.use(cookieParser()); // Enable cookie parsing
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject request
        }
    },
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    credentials: true         // Include cookies or authorization headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRoutes);
app.use("/login", authMiddleware);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route for serving React's `index.html`

// This ensures React Router handles front-end routes
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// Export the app
module.exports = app;
