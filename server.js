import express from 'express';
import dotenv from 'dotenv';
import login from './controllers/userController.js'

dotenv.config();
const app = express();

app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Database query failed');
    }
});

const PORT = process.env.PORT;

app.listen(8080, () => {
    console.log(`server is running on port ${PORT}`)
})