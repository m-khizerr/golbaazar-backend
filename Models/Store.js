const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
    },
    mainCategory: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },
    owner: {
        type: String,
        default: "",
        require: true,
    },
    products: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], default: [] },
    subCategories: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        default: []
    },
    vouchers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' }],
        default: []
    },
    orders: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        default: []
    },
    status: {
        type: String,
        default: "active",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    storeBanner: {
        type: String,
    }    
});

const Store = mongoose.model('Stores', storeSchema);
module.exports = Store;
