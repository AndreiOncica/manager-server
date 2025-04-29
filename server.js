const dotenv = require('dotenv'); // Import dotenv
const app = require('./app'); // Import the app
const http = require('http'); // Optional: Use HTTP for creating a server

// Load environment variables from .env file
dotenv.config();

// Use environment variables for PORT and HOST
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1'; // Default to localhost if not specified

// Create and start the server
const server = http.createServer(app);
server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
