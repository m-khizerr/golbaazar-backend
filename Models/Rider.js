const mongoose = require('mongoose');

const riderSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
    },
    cnic: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    orders: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        default: []
    },
})

const Rider = mongoose.model('Riders', riderSchema);
module.exports = Rider;