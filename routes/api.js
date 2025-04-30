const express = require('express');
const router = express.Router();
const loginRoute = require('./login');
const productRoutes = require('./products');

// Mount individual routes
router.use('/', loginRoute);
router.use('/products', productRoutes);


module.exports = router; // Export the router