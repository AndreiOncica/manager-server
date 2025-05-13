import db from '../config/db.js'

async function login(req, res) {
    try{
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
        console.log('db connected')
    } catch(error) {
        console.error(error);
        res.status(500).send('Database query failed')
    }
}

export default login