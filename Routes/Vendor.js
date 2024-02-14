const express = require('express');
const router = express.Router();
const {upload, uploadMultiple} = require('../middlewares/multerMiddleware');
const { signIn, getAllVendors, deleteVendor, blockUser, getVendor, register } = require('../Controllers/vendorController');

router.post('/registration', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'cnicFront', maxCount: 1 },
    { name: 'cnicBack', maxCount: 1 }
]), register);

router.get('/login', signIn);
router.get('/allUsers', getAllVendors);
router.delete('/deleteuser/:id', deleteVendor);
router.post('/blockuser/:id', blockUser);
router.get('/getuser/:id', getVendor);



module.exports = router;
