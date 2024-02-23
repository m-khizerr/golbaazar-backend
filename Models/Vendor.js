const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
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
    store: {
        type: String,
        default: "",
    },
    mainCategory: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "active",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    coverImage: {
        type: String,
    },
    cnicFront: {
        type: String,
        require: true
    },
    cnicBack: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const Vendor = mongoose.model('Vendors', vendorSchema);
module.exports = Vendor;
