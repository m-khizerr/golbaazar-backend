const express = require('express');
const router = express.Router();
const {upload, uploadMultiple} = require('../middlewares/multerMiddleware'); // Adjust the path accordingly
const { addCategory, deleteCategory, editCategory, getAllCategories, getCategory } = require('../Controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/addcategory',upload.single('coverImage'), addCategory);
router.get('/getallcategories', getAllCategories);
router.post('/editcategory/:categoryId',upload.single('coverImage'), editCategory);
router.delete('/deletecategory/:categoryId', deleteCategory);
router.get('/getcategories/:vendorId', getCategory);

module.exports = router;