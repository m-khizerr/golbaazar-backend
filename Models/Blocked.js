const mongoose = require('mongoose');

const blockedSchema = mongoose.Schema({
    phone: {
        type: String,
        require: true,
    },
    cnic: {
        type: String,
        require: true,
    },
})


const Blocked = mongoose.model('Blocked', blockedSchema);
module.exports = Blocked;