const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, editProduct, deleteProduct, getProducts } = require('../Controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const {upload, uploadMultiple} = require('../middlewares/multerMiddleware'); // Adjust the path accordingly

router.post('/addproduct',upload.single('coverImage'), addProduct);
router.get('/getproducts/:vendorId', getProducts);
router.post('/editproduct', editProduct);
router.get('/getallproducts', getAllProducts);
router.delete('/deleteproduct/:productId', deleteProduct);

module.exports = router;
