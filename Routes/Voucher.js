const express = require('express');
const router = express.Router();
const {addVoucher, getAllVouchers, deleteVoucher } = require('../Controllers/voucherController');

router.post('/addvoucher', addVoucher);
router.delete('/deletevoucher/:voucherId', deleteVoucher);
router.get('/getallvouchers', getAllVouchers);

module.exports = router;