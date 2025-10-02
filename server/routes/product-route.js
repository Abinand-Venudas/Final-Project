// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');
const accessControl = require('../controllers/access_control');
function saveAccessControl(access_type) {
    return function(req, res, next) {
        accessControl.access_controller(access_type, req, res, next);
    }
}
router.post('/products',saveAccessControl("1,3"), productController.addProduct);
router.get('/products', productController.getProducts); 
module.exports = router;
