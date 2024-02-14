const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, editProduct, deleteProduct, getProducts } = require('../Controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addproduct', addProduct);
router.get('/getproducts', getProducts);
router.post('/editproduct', editProduct);
router.get('/getallproducts', getAllProducts);
router.delete('/deleteproduct/:productId', deleteProduct);

module.exports = router;
