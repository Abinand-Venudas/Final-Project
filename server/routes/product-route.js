// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

router.post('/products', productController.addProduct);

module.exports = router;
