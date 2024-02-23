const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        require: true,
    },
    seller: { 
        type: String,
        require: true,
    },
    customer: { 
        type: String,
        require: true,
    },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
      }],
    deliveryAddress: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Pending",
    },
    paid: {
        type: String,
        default: "no"
    }
}) 

const Order = mongoose.model('Orders', orderSchema);
module.exports = Order;