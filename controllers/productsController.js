import db from '../config/db.js';

async function getProducts(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database query failed' });
    }
}

export { getProducts };