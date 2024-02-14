const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    offerName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },  
    date: {
        type: Date,
        default: Date.now(),
    }
})

const Offer = mongoose.model('Offers', offerSchema);
module.exports = Offer;