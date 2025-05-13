import express from 'express';
import db from '../config/db.js';
import authenticateToken from '../middleware/authMiddleware.js';
import {getProducts} from '../controllers/productsController.js'

const router = express.Router();

router.get('/', authenticateToken, getProducts);

export default router;
