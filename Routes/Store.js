const express = require('express');
const router = express.Router();
const {upload} = require('../middlewares/multerMiddleware');
const {addStore, getStore, getAllStores, deleteProduct, deleteCategory} = require('../Controllers/storeController');

router.post('/addstore', upload.single('storeBanner'), addStore);
// router.post('/registration', register);
// router.get('/login', signIn);
router.get('/allstores', getAllStores);
// router.delete('/deleteuser/:id', deleteVendor);
// router.post('/blockuser/:id', blockUser);
router.get('/getstore', getStore);
router.delete('/deleteproduct', deleteProduct);
router.delete('/deletecategory', deleteCategory);

module.exports = router;
