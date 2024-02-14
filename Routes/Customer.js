const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const {signIn, getAllCustomers, register, blockUser, deleteCustomer, getCustomer } = require('../Controllers/customerController');

router.post('/registration', register);
router.get('/login', signIn);
router.get('/allUsers', getAllCustomers);
router.delete('/deleteuser/:id', deleteCustomer);
router.post('/blockuser/:id', blockUser);
router.get('/getuser/:id', getCustomer);



module.exports = router;
