const express = require('express');
const router = express.Router();
const {addOrder, editOrder, getAllOrders, register, signIn, getAllRiders} = require('../Controllers/riderController');

router.post('/registration', register);
router.get('/login', signIn);
router.post('/addorder/:riderId', addOrder);
router.post('/updateorder/:orderId', editOrder);
router.get('/getallorders', getAllOrders);
router.get('/getallriders', getAllRiders);

module.exports = router;
