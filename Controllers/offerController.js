const mongoose = require('mongoose');
const Offer = require('../Models/Offer');
const Store = require('../Models/Store');

const addOffer = async (req, res) => {
    console.log("Adding offer")
    try {
      const {offerName, description, state} = req.body;
      const offer = new Offer({
        offerName: offerName,
        description: description,
        state: state,
      })
      if (state === "public") {
        try {
            const savedOffer = await offer.save();
            res.status(200).json(offer);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
        } else {
            const sellerId = req.body.seller;
            const sellerStore = await Store.findOne({ owner: sellerId });
        
            if (!sellerStore) {
                return res.status(404).json({ error: 'Seller or Store not found' });
            }
        
            const savedOffer = await offer.save();
        
            sellerStore.offers.push(savedOffer);
        
            Promise.all([sellerStore.save()])
                .then(() => {
                    res.status(201).json({
                        message: 'Offer Created Successfully',
                        createdOffer: savedOffer,
                    });
                })
                .catch((saveError) => {
                    console.error('Error saving store or Offer:', saveError);
                    res.status(500).json({ error: 'Internal server error' });
                });
        }    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getAllOffers = async (req, res) => {
    try {
      const offers = await Offer.find(); 
      res.status(200).json({
        message: "Offers retrieved successfully",
        offers: offers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


const deleteOffer = async (req, res) => {
  const offerId = req.params.offerId;
  try {
    const deletedOffer = await Offer.findByIdAndRemove(offerId);
    if (!deletedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json({
      message: 'Offer deleted successfully',
      deletedOffer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {addOffer, deleteOffer, getAllOffers}