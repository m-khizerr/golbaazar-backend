const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    orders: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        default: []
    },
    cart: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: "active"
    }
});

const Customer = mongoose.model('Customers', customerSchema);
module.exports = Customer;
