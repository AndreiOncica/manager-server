// Import necessary modules
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import login from './routes/login.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRoutes from './routes/products.js';
import authenticateToken from './middleware/authMiddleware.js'; // Import authentication middleware

// Initialize Express application
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Load allowed origin from .env
const allowedOrigin = process.env.CORS_ORIGIN || '*';

app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Enable credentials if needed
}));

// Define routes
app.use('/api/login', login);
app.use('/api/products', authenticateToken, productRoutes);

// Serve React frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'client')));

// Ensure React handles non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Define server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
