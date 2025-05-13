import express from 'express';
import { loginUser, getLoginPage } from '../controllers/userController.js'

const router = express.Router();

router.post('/', loginUser);

export default router;