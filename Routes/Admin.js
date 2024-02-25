const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('../Controllers/vendorController');

router.post('/registration', signUp);
router.get('/login', signIn);

module.exports = router;
