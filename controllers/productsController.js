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

async function getCategories(req, res) {
    try {
        const [rows] = await db.query("SELECT name FROM products_categories");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
}

async function getBrands(req, res) {
    try {
        const [rows] = await db.query("SELECT name FROM products_brands");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
}


export { getProducts, getCategories, getBrands };