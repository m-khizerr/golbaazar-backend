const express = require('express');
const router = express.Router();
const {addOffer, getAllOffers, deleteOffer } = require('../Controllers/offerController');

router.post('/addoffer', addOffer);
router.delete('/deleteoffer/:offerId', deleteOffer);
router.get('/getalloffers', getAllOffers);

module.exports = router;