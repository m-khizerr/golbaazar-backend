const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
    voucherName: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
    percentage: {
        type: Number,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },  
    date: {
        type: String,
        default: Date.now(),
    }
})

const Voucher = mongoose.model('Vouchers', voucherSchema);
module.exports = Voucher;